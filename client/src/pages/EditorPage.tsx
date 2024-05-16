// React
import { useState, useEffect, useReducer } from 'react';

// Mantine
import { Button, ActionIcon, Tooltip, Group } from '@mantine/core';

// Tabler Icons
import { IconFolderFilled, IconFileFilled, IconUserPlus, IconLogin2 } from '@tabler/icons-react';

// Other third-party packages
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Types
import FolderType from '../types/FolderType';
import FileType from '../types/FileType';

// Component imports
import MarkdownEditor from '../componentsNew/MarkdownEditor';
import MarkdownViewer from '../componentsNew/MarkdownViewer';
import FileExplorerPanel from '../components/FileExplorerPanel';

import testData from '../testData';

const enum ACTIONS {
  ADD_ITEM,
  UPDATE_ITEM_NAME,
  EDIT_ITEM,
  DELETE_ITEM,
  EXPAND_FOLDER,
  UPDATE_FILE_BODY,
}

type FileCacheType = {
  id: string;
  parentFolderIds: string[];
  body: string;
};

type RecentFileTabsType = {
  id: string;
  parentFolderIds: string[];
  name: string;
};

const EditorPage = () => {
  // Returns the current full date and time.
  const getCurrentDateAndTime = () => {
    return new Date().toLocaleString('default', {
      dateStyle: 'full',
      timeStyle: 'long',
    });
  }; // END getCurrentDateAndTime

  // --- UNCOMMENT THIS SECTION TO RESET LOCAL STORAGE ---
  // localStorage.clear();
  // localStorage.setItem('files', JSON.stringify([]));

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState('-1'); // The ID of the currently selected file, or -1 if none is selected.
  const [textEditor, setTextEditor] = useState<string>(''); // The text of the currently selected file
  const [fileExplorerOpen, setFileExplorerOpen] = useState(true);
  const [editorAndViewer, setEditorAndViewer] = useState(true);
  const [recentFileTabs, setRecentFileTabs] = useState<RecentFileTabsType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Keep track of whether or not the user is logged in

  useEffect(() => {
    axios({ method: 'get', url: 'http://localhost:3000/getUser' })
      .then((res) => {
        if (res.data.username) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [data, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.type) {
        case ACTIONS.ADD_ITEM:
          if (action.payload.idChain === null) {
            if (action.payload.itemType === 'Folder') {
              draft.unshift({
                id: uuidv4(),
                parentFolderIds: [],
                type: 'Folder',
                name: 'Untitled',
                isExpand: true,
                isEditingName: true,
                items: [],
              });
            } else if (action.payload.itemType === 'File') {
              const currentNotes = localStorage.getItem('files');
              const id = uuidv4();
              if (currentNotes) {
                const currentNotesObj = JSON.parse(currentNotes);
                currentNotesObj.push({ id: id, parentFolderIds: [], body: '' });
                localStorage.setItem('files', JSON.stringify(currentNotesObj));
              }
              draft.unshift({
                id: id,
                parentFolderIds: [],
                type: 'File',
                name: 'Untitled',
                body: '',
                isSelected: false,
                isEditingName: true,
              });
            }
          } else {
            for (let i = 0; i < action.payload.idChain.length; i++) {
              draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
            }
            draft = draft.find((folder: FolderType) => folder.id === action.payload.targetItemId);
            draft.expand = true;
            if (action.payload.itemType === 'Folder') {
              draft.items = [
                {
                  id: uuidv4(),
                  parentFolderIds: [...action.payload.idChain, action.payload.targetItemId],
                  type: 'Folder',
                  name: 'Untitled',
                  isExpand: false,
                  isEditingName: true,
                  items: [],
                },
                ...draft.items,
              ];
            } else if (action.payload.itemType === 'File') {
              const currentNotes = localStorage.getItem('files');
              const id = uuidv4();
              if (currentNotes) {
                const currentNotesObj = JSON.parse(currentNotes);
                currentNotesObj.push({ id: id, parentFolderIds: [...action.payload.idChain, action.payload.targetItemId], body: '' });
                localStorage.setItem('files', JSON.stringify(currentNotesObj));
              }
              draft.items = [
                {
                  id: id,
                  parentFolderIds: [...action.payload.idChain, action.payload.targetItemId],
                  type: 'File',
                  name: 'Untitled',
                  body: '',
                  isSelected: false,
                  isEditingName: true,
                },
                ...draft.items,
              ];
            }
          }
          break;

        case ACTIONS.UPDATE_FILE_BODY:
          break;

        case ACTIONS.UPDATE_ITEM_NAME:
          for (let i = 0; i < action.payload.idChain.length; i++) {
            draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
          }
          draft = draft.find((item: FolderType | FileType) => item.id === action.payload.targetItemId);
          draft.name = action.payload.newItemName;
          draft.isEditingName = false;

          break;

        case ACTIONS.EDIT_ITEM:
          for (let i = 0; i < action.payload.idChain.length; i++) {
            draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
          }
          draft = draft.find((item: FolderType | FileType) => item.id === action.payload.targetItemId);
          draft.isEditingName = true;
          break;

        case ACTIONS.DELETE_ITEM:
          for (let i = 0; i < action.payload.idChain.length; i++) {
            draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
          }
          const index = draft.findIndex((item: FolderType | FileType) => item.id === action.payload.targetItemId);
          draft.splice(index, 1);

          if (action.payload.targetItemId === selectedFile) {
            setSelectedFile('-1');
          }

          const currentNotes = localStorage.getItem('files');
          if (currentNotes) {
            let currentNotesObj = JSON.parse(currentNotes);
            currentNotesObj = currentNotesObj.filter((file: FileCacheType) => file.id !== action.payload.targetItemId);
            localStorage.setItem('files', JSON.stringify(currentNotesObj));
          }

          break;

        case ACTIONS.EXPAND_FOLDER:
          for (let i = 0; i < action.payload.idChain.length; i++) {
            draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
          }
          draft = draft.find((folder: FolderType) => folder.id === action.payload.targetFolderId);
          draft.isExpand = !draft.isExpand;
          break;

        default:
          break;
      }
    }),
    []
  );

  const handleAddItem = (idChain: string[] | null, targetItemId: string | null, itemType: string) => {
    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: { idChain, targetItemId, itemType },
    });
  };

  /* ::FILE/FOLDER ACTIONS:: */

  // Handles the expanding/minimising of a folder (when a folder is expanded,
  // its subfolders are shown).
  //
  const handleToggleExpandFolder = (idChain: string[], targetFolderId: string) => {
    dispatch({
      type: ACTIONS.EXPAND_FOLDER,
      payload: { idChain, targetFolderId },
    });
  };

  // Handles the updating of the folder name, when the user has saved the changes to the new name of the folder.
  const handleUpdateItemName = (idChain: string[], targetItemId: string, newItemName: string) => {
    dispatch({
      type: ACTIONS.UPDATE_ITEM_NAME,
      payload: { idChain, targetItemId, newItemName },
    });

    const newRecentFileTabs = [...recentFileTabs];
    const existingFile = newRecentFileTabs.find((file: RecentFileTabsType) => file.id === targetItemId);
    if (existingFile) {
      console.log('THE FILE EXISTS');
      existingFile.name = newItemName;
      setRecentFileTabs(newRecentFileTabs);
    }
  };

  // Handles the updating of the content of a file.
  const handleUpdateFileBody = (idChain: string[], targetFileId: string, newFileBody: string) => {
    const currentNotes = localStorage.getItem('files');
    if (currentNotes) {
      let currentNotesObj = JSON.parse(currentNotes);
      currentNotesObj = currentNotesObj.map((file: FileCacheType) => {
        if (file.id === targetFileId) {
          file.body = newFileBody;
        }
        return file;
      });
      localStorage.setItem('files', JSON.stringify(currentNotesObj));
    }
  };

  // Handles the display of the input, when the user is currently editing the name of the folder.
  const handleEditItem = (idChain: string[], targetItemId: string) => {
    dispatch({ type: ACTIONS.EDIT_ITEM, payload: { idChain, targetItemId } });
  };

  // Handles the deletion of a particular file/folder.
  const handleDeleteItem = (idChain: string[], targetItemId: string, itemType: string) => {
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { idChain, targetItemId } });

    // Handle the case where a folder is deleted, and there are file tabs where the files are in that folder.
    if (itemType === 'folder') {
      const currentNotes = localStorage.getItem('files');
      if (currentNotes) {
        let currentNotesObj = JSON.parse(currentNotes);
        currentNotesObj = currentNotesObj.filter((file: FileCacheType) => !file.parentFolderIds.includes(targetItemId));
        localStorage.setItem('files', JSON.stringify(currentNotesObj));
      }

      // If a file is currently open, and is within the deleted folder.
      const newRecentFileTabs = recentFileTabs.filter((file: RecentFileTabsType) => !file.parentFolderIds.includes(targetItemId));
      setRecentFileTabs(newRecentFileTabs);
      if (selectedFile.includes(targetItemId)) {
        setSelectedFile('-1');
      }
      // Handle the case where a file is deleted.
    } else if (itemType === 'file') {
      const currentNotes = localStorage.getItem('files');
      if (currentNotes) {
        let currentNotesObj = JSON.parse(currentNotes);
        // Remove from local storage
        currentNotesObj = currentNotesObj.filter((file: FileCacheType) => file.id !== targetItemId);
        localStorage.setItem('files', JSON.stringify(currentNotesObj));
      }
      // Remove tab for file
      const newRecentFileTabs = recentFileTabs.filter((file: RecentFileTabsType) => file.id !== targetItemId);
      setRecentFileTabs(newRecentFileTabs);
    }
  };

  // Handles the selection of a file when a user double-clicks on it.
  const handleSelectFile = (id: string, parentFolderIds: string[], name: string) => {
    // SAVING NOTES TO LOCAL STORAGE
    const currentNotes = localStorage.getItem('files');
    if (currentNotes) {
      let currentNotesObj = JSON.parse(currentNotes);
      if (selectedFile !== '-1') {
        currentNotesObj = currentNotesObj.map((file: FileCacheType) => {
          if (file.id === selectedFile) {
            file.body = textEditor;
          }
          return file;
        });
        localStorage.setItem('files', JSON.stringify(currentNotesObj));
      }

      const newSelectedFileBody = currentNotesObj.find((file: FileCacheType) => file.id === id).body;

      setTextEditor(newSelectedFileBody);
      setSelectedFile(id);

      const newRecentFileTabs = [...recentFileTabs];
      const existingFile = newRecentFileTabs.find((file: RecentFileTabsType) => file.id === id);
      if (!existingFile) {
        newRecentFileTabs.push({ id, parentFolderIds, name });
        setRecentFileTabs(newRecentFileTabs);
      }
    }
  };

  // Handles the change of state of 'textEditor', which holds the text of the currently selected file.
  const handleChangeTextEditor = (newBody: string) => {
    setTextEditor(newBody);
  };

  const logout = async () => {
    try {
      const res = await axios({ method: 'get', url: 'http://localhost:3000/logout' });
      setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Button color="primary" variant="filled" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Group>
          <Button color="green" size="xs" radius="xs" leftSection={<IconLogin2 />} onClick={() => navigate('/login')}>
            Log In
          </Button>
          <Button color="orange" size="xs" radius="xs" leftSection={<IconUserPlus />} onClick={() => navigate('/register')}>
            Register
          </Button>
        </Group>
      )}
      {fileExplorerOpen && (
        <div id="file-explorer-panel">
          <div id="toolbar">
            <Tooltip.Group openDelay={600} closeDelay={100}>
              <Tooltip label="New File" withArrow arrowSize={5}>
                <ActionIcon size="lg" color="primary" variant="subtle" onClick={() => handleAddItem(null, null, 'File')}>
                  <IconFileFilled />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="New Folder" withArrow arrowSize={5}>
                <ActionIcon size="lg" color="primary" variant="subtle" onClick={() => handleAddItem(null, null, 'Folder')}>
                  <IconFolderFilled />
                </ActionIcon>
              </Tooltip>
            </Tooltip.Group>
          </div>
          <FileExplorerPanel
            data={data}
            onToggleExpand={handleToggleExpandFolder}
            onUpdateName={handleUpdateItemName}
            onUpdateBody={handleUpdateFileBody}
            onToggleEdit={handleEditItem}
            onAdd={handleAddItem}
            onDelete={handleDeleteItem}
            onSelectFile={handleSelectFile}
          />
        </div>
      )}
      {editorAndViewer ? (
        <>
          <div id="markdown-editor-panel">{selectedFile !== '-1' && <MarkdownEditor id={selectedFile} body={textEditor} onChange={handleChangeTextEditor} />}</div>
          <div id="markdown-viewer-panel">{selectedFile !== '-1' && <MarkdownViewer body={textEditor} />}</div>
        </>
      ) : (
        <>
          <div id="markdown-viewer-panel">{selectedFile !== '-1' && <MarkdownViewer body={textEditor} />}</div>
        </>
      )}
      {recentFileTabs.map((file: RecentFileTabsType) => {
        return (
          <div key={file.id}>
            <button onClick={() => handleSelectFile(file.id, file.parentFolderIds, file.name)}>{file.name}</button>
          </div>
        );
      })}
    </>
  );
};

export default EditorPage;
