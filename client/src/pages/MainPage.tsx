// React
import { useState, useEffect, useReducer, createContext } from "react";

import "./test.css";

// Mantine
import { Button, ActionIcon, Tooltip, Group, Burger, Stack, Box, Flex, Text, Drawer, Textarea, Switch, SegmentedControl, CloseButton, useMantineColorScheme, Divider } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconPencil, IconEye, IconSettings, IconAdjustments, IconAdjustmentsHorizontal, IconFolderOpen } from "@tabler/icons-react";

// Tabler Icons
import { IconFolderFilled, IconFileFilled, IconUserPlus, IconLogin2 } from "@tabler/icons-react";

// Other third-party packages
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";

// Types
import FolderType from "../types/FolderType";
import FileType from "../types/FileType";

// Component imports
import MarkdownEditor from "../components/MarkdownEditor";
import MarkdownViewer from "../components/MarkdownViewer";
import FileExplorerPanel from "../components/FileExplorerPanel";

// CSS
import styles from "../styles/mainPage.module.css";

import testData from "../testData";
import FileAndFolderTreeType from "../types/FileAndFolderTreeType";
import MyDocument from "../componentsNew/MyDocument";
import SettingsButton from "../components/SettingsButton";
import MobileSidebar from "../components/MobileSidebar";
import Toolbar from "../components/Toolbar";
import { notifications } from "@mantine/notifications";

const enum ACTIONS {
  SET_DATA,
  ADD_ITEM,
  UPDATE_ITEM_NAME,
  EDIT_ITEM,
  DELETE_ITEM,
  EXPAND_FOLDER,
  UPDATE_FILE_BODY,
}

type selectedFileType = {
  id: string;
  name: string;
  parentFolderIds: string[];
};

type EditedFilesType = [string, string[], string]; // id, parentFolderIds, body;

type RecentFileTabType = {
  id: string;
  name: string;
  parentFolderIds: string[];
};

// export const DimensionsContext = createContext();

const MainPage = () => {
  // Returns the current full date and time.
  const getCurrentDateAndTime = () => {
    return new Date().toLocaleString("default", {
      dateStyle: "full",
      timeStyle: "long",
    });
  }; // END getCurrentDateAndTime

  // --- UNCOMMENT THESE TWO LINES TO RESET LOCAL STORAGE ---
  // localStorage.clear();
  // localStorage.setItem('data', JSON.stringify(testData));

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<selectedFileType | null>(null); // The ID of the currently selected file, or -1 if none is selected.

  // editedFiles keeps a cache of all files that have been edited (opening a file by clicking on it will count as it being 'edited',
  // even if the actual contents of it are unchanged), which includes their id, parent folder ids, and body.
  // This is because updating the main 'data' state can be time-consuming if there are lots of files with lots of content in them,
  // since we would need to update the entire state if we just wanted to change a small part of it.
  // Only when the user clicks 'save' will all the edited files be saved into the main 'data' state
  const [editedFiles, setEditedFiles] = useState<EditedFilesType[]>([]);

  const [textEditor, setTextEditor] = useState<string>(""); // The text of the currently selected file, displayed in the Markdown editor
  const [fileExplorerOpen, setFileExplorerOpen] = useState(true);
  const [editorAndViewer, setEditorAndViewer] = useState(true);
  const [recentFileTabs, setRecentFileTabs] = useState<RecentFileTabType[]>([]); // Stores the ids of file tabs
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Keep track of whether or not the user is logged in
  const [canSaveToDB, setCanSaveToDB] = useState(false);
  const [editorOrViewer, setEditorOrViewer] = useState("editor");

  const [fileExplorerOpened, { toggle, close }] = useDisclosure();

  const smallScreen = useMediaQuery("(max-width: 36em");
  const mediumScreen = useMediaQuery("(max-width: 62em");
  const bigScreen = useMediaQuery("(max-width: 75em");

  const { colorScheme, setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    axios({ method: "get", url: "http://localhost:3000/getUser" })
      .then((res) => {
        if (res.data.user) {
          console.log("LOGGED IN");
          setIsLoggedIn(true);
          setSelectedFile(null);
          setTextEditor("");
          setEditedFiles([]);
          setRecentFileTabs([]);
          if (res.data.data) {
            dispatch({ type: ACTIONS.SET_DATA, payload: { fetchedData: JSON.parse(res.data.data) } });
          } else {
            dispatch({ type: ACTIONS.SET_DATA, payload: { fetchedData: [] } });
          }
        } else {
          console.log("NOT LOGGED IN");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  let [data, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.type) {
        case ACTIONS.SET_DATA:
          draft = action.payload.fetchedData;
          return action.payload.fetchedData;

        case ACTIONS.ADD_ITEM:
          if (action.payload.idChain === null) {
            console.log("INSIDE");
            console.log(selectedFile);
            if (action.payload.itemType === "Folder") {
              draft.unshift({
                id: uuidv4(),
                parentFolderIds: [],
                type: "Folder",
                name: "",
                isExpand: true,
                isEditingName: true,
                items: [],
              });
            } else if (action.payload.itemType === "File") {
              draft.unshift({
                id: uuidv4(),
                parentFolderIds: [],
                type: "File",
                name: "",
                body: "",
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
            if (action.payload.itemType === "Folder") {
              draft.items = [
                {
                  id: uuidv4(),
                  parentFolderIds: [...action.payload.idChain, action.payload.targetItemId],
                  type: "Folder",
                  name: "",
                  isExpand: false,
                  isEditingName: true,
                  items: [],
                },
                ...draft.items,
              ];
            } else if (action.payload.itemType === "File") {
              draft.items = [
                {
                  id: uuidv4(),
                  parentFolderIds: [...action.payload.idChain, action.payload.targetItemId],
                  type: "File",
                  name: "",
                  body: "",
                  isSelected: false,
                  isEditingName: true,
                },
                ...draft.items,
              ];
            }
          }
          break;

        case ACTIONS.UPDATE_FILE_BODY:
          console.log("IN UPDATE FILE BODY");
          for (let i = 0; i < action.payload.idChain.length; i++) {
            draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
          }
          draft = draft.find((item: FileType) => item.id === action.payload.targetItemId);
          draft.body = action.payload.targetItemBody;
          break;

        case ACTIONS.UPDATE_ITEM_NAME:
          console.log("UPDATE_ITEM_NAME");
          for (let i = 0; i < action.payload.idChain.length; i++) {
            draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
          }
          draft = draft.find((item: FolderType | FileType) => item.id === action.payload.targetItemId);
          console.log(action.payload.newItemName);
          draft.name = action.payload.newItemName;
          draft.isEditingName = false;
          // if (!action.payload.newlyCreated) {
          if (action.payload.targetItemId === selectedFile?.id) {
            setSelectedFile({ ...selectedFile, name: action.payload.newItemName });
          }
          // }
          break;

        case ACTIONS.EDIT_ITEM:
          for (let i = 0; i < action.payload.idChain.length; i++) {
            draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
          }
          draft = draft.find((item: FolderType | FileType) => item.id === action.payload.targetItemId);
          draft.isEditingName = true;
          break;

        /*
        Handle the case where the user decides to delete a file or a folder
        */
        case ACTIONS.DELETE_ITEM:
          // Go through the parent folder ids of the item to be deleted.
          for (let i = 0; i < action.payload.idChain.length; i++) {
            draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
          }
          // We have arrived at the direct parent of the item, so find this item within the folder and get its index.
          const index = draft.findIndex((item: FolderType | FileType) => item.id === action.payload.targetItemId);

          draft.splice(index, 1);

          // // If the item deleted was a file that was fileExplorerOby the user, then deselect this file as it no longer exists.
          // if (action.payload.targetItemId === selectedFile) {
          //   setSelectedFile('-1');
          // }

          // If a folder is deleted, then we want to remove any files contained in this folder from 'editedFiles' and 'recentFileTabs'
          if (action.payload.itemType === "Folder") {
            setEditedFiles(
              editedFiles.filter((fileData: EditedFilesType) => {
                if (!fileData[1].includes(action.payload.targetItemId)) {
                  return fileData;
                }
              })
            );
            setRecentFileTabs(
              recentFileTabs.filter((fileData: RecentFileTabType) => {
                if (!fileData.parentFolderIds.includes(action.payload.targetItemId)) {
                  return fileData;
                }
              })
            );

            // If the currently selected file is contained within this deleted folder, then we want to deselect this file
            if (selectedFile?.parentFolderIds.includes(action.payload.targetItemId)) {
              setSelectedFile(null);
              setTextEditor("");
            }

            // If a file is deleted, then we want to remove this file from 'editedFiles' and 'recentFileTabs
          } else if (action.payload.itemType === "File") {
            setEditedFiles(
              editedFiles.filter((fileData: EditedFilesType) => {
                if (fileData[0] !== action.payload.targetItemId) {
                  return fileData;
                }
              })
            );
            setRecentFileTabs(
              recentFileTabs.filter((fileData: RecentFileTabType) => {
                if (fileData.id !== action.payload.targetItemId) {
                  return fileData;
                }
              })
            );
            // If the currently selected file is deleted, then we want to deselect this file.
            if (action.payload.targetItemId === selectedFile?.id) {
              setSelectedFile(null);
              setTextEditor("");
            }
          }

          break;

        /*
        Handle the case where the user decides to 'expand' or 'minimise' a folder in the file explorer
        */
        case ACTIONS.EXPAND_FOLDER:
          for (let i = 0; i < action.payload.idChain.length; i++) {
            draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
          }
          draft = draft.find((folder: FolderType) => folder.id === action.payload.targetFolderId);

          if (action.payload.isExpand) {
            draft.isExpand = true;
          } else {
            draft.isExpand = false;
          }
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
  const handleToggleExpandFolder = (idChain: string[], targetFolderId: string, isExpand: boolean) => {
    dispatch({
      type: ACTIONS.EXPAND_FOLDER,
      payload: { idChain, targetFolderId, isExpand },
    });
  };

  // Handles the updating of the folder name, when the user has saved the changes to the new name of the folder.
  const handleUpdateItemName = (idChain: string[], targetItemId: string, newItemName: string) => {
    // const handleUpdateItemName = (idChain: string[], targetItemId: string, newItemName: string, newlyCreated: boolean) => {
    dispatch({
      type: ACTIONS.UPDATE_ITEM_NAME,
      payload: { idChain, targetItemId, newItemName },
      // payload: { idChain, targetItemId, newItemName, newlyCreated },
    });

    // If it's a file, we also want to update the name displayed on its file tab.
    const newRecentFileTabs = [...recentFileTabs];
    const existingFile = newRecentFileTabs.find((file) => file.id === targetItemId);
    if (existingFile) {
      existingFile.name = newItemName;
      setRecentFileTabs(newRecentFileTabs);
    }
  };

  // // Handles the updating of the content of a file.
  // const handleUpdateFileBody = (idChain: string[], targetFileId: string, newFileBody: string) => {
  //   const currentNotes = localStorage.getItem('files');
  //   if (currentNotes) {
  //     let currentNotesObj = JSON.parse(currentNotes);
  //     currentNotesObj = currentNotesObj.map((file: FileCacheType) => {
  //       if (file.id === targetFileId) {
  //         file.body = newFileBody;
  //       }
  //       return file;
  //     });
  //     localStorage.setItem('files', JSON.stringify(currentNotesObj));
  //   }
  // };

  // Handles the display of the input, when the user is currently editing the name of the folder.
  const handleEditItem = (idChain: string[], targetItemId: string) => {
    dispatch({ type: ACTIONS.EDIT_ITEM, payload: { idChain, targetItemId } });
  };

  /*
  Handles the deletion of a particular file/folder.
  Unlike editing the contents of a file, this will delete the file/folder directly from the main 'data' state
  */
  const handleDeleteItem = (idChain: string[], targetItemId: string, itemType: string) => {
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { idChain, targetItemId, itemType } });
  };

  /*
  Handles the selection of a file when a user clicks on it.
  Essentially, when a user is editing the contents of a file, only the state 'textEditor' will be changed. (Remember
  that 'textEditor' holds the content of the currently opened file, and will be used to render the parsed Markdown).
  When a user then opens another file, the file they were just working on will be saved into the 'editedFiles' folder.
  If the new file was opened previously, then its contents will just be updated in 'editedFiles', but if it was not
  opened previously then a new array for that file will be added to 'editedFiles'.
  */
  const handleSelectFile = (id: string, parentFolderIds: string[], name: string) => {
    // When the user selects a different file, we want to save the contents of the previous file (contents of 'textEditor')
    // into 'editedFiles'. However, ONLY DO THIS if a previous file was already selected.
    if (selectedFile !== null) {
      let editedFilesCopy = [...editedFiles];
      editedFilesCopy = editedFilesCopy.map((fileData) => {
        if (fileData[0] === selectedFile?.id) {
          fileData[2] = textEditor;
        }
        return fileData;
      });
    }

    let nextFileBody;

    // Check if the newly selected file is in 'editedFiles' so that we can retrieve the contents quicker.
    let found = false;
    for (let fileData of editedFiles) {
      if (fileData[0] === id) {
        nextFileBody = fileData[2];
        found = true;
        break;
      }
    }

    // If it's not there, then fetch it from the main 'data' state, and create a new array for 'editedFiles' holding
    // the relevant details for this file.
    if (!found) {
      let d = [...data];
      for (let i = 0; i < parentFolderIds.length; i++) {
        d = d.find((folder: FolderType) => folder.id === parentFolderIds[i]).items;
      }
      const nextFile = d.find((item: FolderType | FileType) => item.id === id);
      const newFileArray: EditedFilesType = [id, parentFolderIds, nextFile.body];
      nextFileBody = nextFile.body;
      setEditedFiles([...editedFiles, newFileArray]);
    }

    found = false;
    for (let tab of recentFileTabs) {
      if (tab.id === id) {
        found = true;
        break;
      }
    }

    if (!found) {
      setRecentFileTabs([...recentFileTabs, { id, name, parentFolderIds }]);
    }

    setSelectedFile({ id, name, parentFolderIds });
    setTextEditor(nextFileBody);

    close();
  };

  // Handles the creation of a file tab for this file (if not there already) if the user double-clicks on it.
  const handleAddFileTab = (id: string, name: string, parentFolderIds: string[]) => {
    // Check if there is already a file tab for the file
    let found = false;
    for (let tab of recentFileTabs) {
      if (tab.id === id) {
        found = true;
        break;
      }
    }

    if (!found) {
      setRecentFileTabs([...recentFileTabs, { id, name, parentFolderIds }]);
    }
  };

  // Handles the change of state of 'textEditor', which holds the text of the currently selected file.
  const handleChangeTextEditor = (newBody: string) => {
    setTextEditor(newBody);
    if (canSaveToDB) {
      setCanSaveToDB(false);
    }
  };

  /*
  Handles the saving of edited files to the main 'data' state. This occurs when the user manually clicks on 'save'
  */
  const handleSaveFilesToState = () => {
    let editedFilesCopy = [...editedFiles];

    if (selectedFile) {
      console.log("THERE IS A SELECTED FILE");
      editedFilesCopy = editedFiles.map((fileData) => {
        if (fileData[0] === selectedFile.id) {
          fileData[2] = textEditor;
        }
        return fileData;
      });

      setEditedFiles(editedFilesCopy);
    }

    for (let fileData of editedFilesCopy) {
      dispatch({ type: ACTIONS.UPDATE_FILE_BODY, payload: { targetItemId: fileData[0], idChain: fileData[1], targetItemBody: fileData[2] } });
    }
    setCanSaveToDB(true);
    notifications.show({
      color: "green",
      title: "Success!",
      message: "Your files have been saved to state. You may now save them to your account.",
    });
  };

  const logout = async () => {
    try {
      const res = await axios({ method: "get", url: "http://localhost:3000/logout" });
      setIsLoggedIn(false);
      setSelectedFile(null);
      setTextEditor("");
      setEditedFiles([]);
      setRecentFileTabs([]);
      dispatch({ type: ACTIONS.SET_DATA, payload: { fetchedData: [] } });
      notifications.show({
        color: "green",
        title: "Success!",
        message: "You are now logged out.",
      });
    } catch (err) {
      console.log(err);
    }
  };

  let folders = [];
  let files = [];

  const handleSaveToDB = async () => {
    try {
      const res = await axios({ method: "post", url: "http://localhost:3000/saveData", data: { data: JSON.stringify(data) } });
      console.log(res);
      notifications.show({
        color: "green",
        title: "Success!",
        message: "Your files have been saved to your account.",
      });
    } catch (err) {
      console.log(err);
      notifications.show({
        color: "red",
        title: "Oops!",
        message: "There was an error in trying to save your files to your account.",
      });
    }
  };

  const handleFetchDataFromDB = async () => {
    try {
      const res = await axios({ method: "get", url: "http://localhost:3000/getData" });
      console.log(res);
      if (res.data.data) {
        setSelectedFile(null);
        setTextEditor("");
        setEditedFiles([]);
        setRecentFileTabs([]);
        dispatch({ type: ACTIONS.SET_DATA, payload: { fetchedData: JSON.parse(res.data.data) } });
        notifications.show({
          color: "green",
          title: "Success!",
          message: "Your files have been fetched from the database.",
        });
      }
    } catch (err) {
      console.log(err);
      notifications.show({
        color: "red",
        title: "Oops!",
        message: "There was an error in fetching your files from the database.",
      });
    }
  };

  const handleExportPDF = () => {
    ReactPDF.render(<MyDocument />, "C:/Users/shaya/OneDrive/Documents PREV/My Projects/example.pdf");
  };

  // console.log("SELECTED FILE NAME");
  console.log(selectedFile);

  return (
    // <>
    //   {smallScreen ? <p>SMALL SCREEN</p> : <p>NOT SMALL SCREEN</p>}
    // <>
    //   {isLoggedIn ? (
    //     // Show the 'logout' and 'save' buttons if the user is logged in
    //     <Group>
    //       <Button variant="filled" onClick={logout}>
    //         Logout
    //       </Button>
    //       <Button onClick={handleSaveFilesToState}>Save All To State</Button>
    //       {canSaveToDB ? (
    //         <Button variant="filled" onClick={handleSaveToDB}>
    //           Save All To Database
    //         </Button>
    //       ) : (
    //         <Button variant="filled" onClick={handleSaveToDB} disabled>
    //           Save All To Database
    //         </Button>
    //       )}
    //       <Button variant="filled" onClick={handleExportPDF}>
    //         Export As PDF
    //       </Button>
    //       <PDFDownloadLink document={<MyDocument text={"hey"} />}>Download</PDFDownloadLink>
    //       <Button onClick={handleFetchDataFromDB}>Get Data</Button>
    //     </Group>
    //   ) : (
    //     // Show the 'login' and 'register' buttons if the user is not logged in
    //     <Group>
    //       <Button color="green" size="xs" leftSection={<IconLogin2 />} onClick={() => navigate("/login")}>
    //         Log In
    //       </Button>
    //       <Button color="orange" size="xs" leftSection={<IconUserPlus />} onClick={() => navigate("/register")}>
    //         Register
    //       </Button>
    //     </Group>
    //   )}

    //   {fileExplorerOpen && (
    //     <div id="file-explorer-panel">
    //       {/* Toolbar - 'create new file' and 'create new folder' buttons */}
    //       <div id="toolbar">
    //         <Tooltip.Group openDelay={600} closeDelay={100}>
    //           <Tooltip label="New File" withArrow arrowSize={5}>
    //             <ActionIcon size="lg" variant="subtle" onClick={() => handleAddItem(null, null, "File")}>
    //               <IconFileFilled />
    //             </ActionIcon>
    //           </Tooltip>
    //           <Tooltip label="New Folder" withArrow arrowSize={5}>
    //             <ActionIcon size="lg" variant="subtle" onClick={() => handleAddItem(null, null, "Folder")}>
    //               <IconFolderFilled />
    //             </ActionIcon>
    //           </Tooltip>
    //         </Tooltip.Group>
    //       </div>
    //       <FileExplorerPanel
    //         data={data}
    //         onToggleExpand={handleToggleExpandFolder}
    //         onUpdateName={handleUpdateItemName}
    //         onToggleEdit={handleEditItem}
    //         onAddFileTab={handleAddFileTab}
    //         onAdd={handleAddItem}
    //         onDelete={handleDeleteItem}
    //         onSelectFile={handleSelectFile}
    //       />
    //     </div>
    //   )}
    //   {editorAndViewer ? (
    //     <>
    //       <div id="markdown-editor-panel">{selectedFile !== null && <MarkdownEditor id={selectedFile.id} body={textEditor} onChange={handleChangeTextEditor} />}</div>
    //       <div id="markdown-viewer-panel">{selectedFile !== null && <MarkdownViewer body={textEditor} />}</div>
    //     </>
    //   ) : (
    //     <>
    //       <div id="markdown-viewer-panel">{selectedFile !== null && <MarkdownViewer body={textEditor} />}</div>
    //     </>
    //   )}
    //   {recentFileTabs.map((file: RecentFileTabType) => {
    //     return (
    //       <div key={file.id}>
    //         <button onClick={() => handleSelectFile(file.id, file.parentFolderIds, file.name)}>{file.name}</button>
    //       </div>
    //     );
    //   })}
    // </>

    // -------------------------------------------------------

    <>
      {/* We provide a 'dimensions' context so that the components can be rendered differently based on the screen size. */}
      {/* <DimensionsContext.Provider value={smallScreen ? smallScreen : mediumScreen ? mediumScreen : bigScreen}> */}
      <Stack className="App" h="100vh" gap="0">
        <Toolbar
          fileExplorerOpened={fileExplorerOpened}
          onToggle={toggle}
          editorOrViewer={editorOrViewer}
          setEditorOrViewer={setEditorOrViewer}
          recentFileTabs={recentFileTabs}
          onSelectFile={handleSelectFile}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          onSaveToState={handleSaveFilesToState}
          onSaveToDB={handleSaveToDB}
          onFetchFromDB={handleFetchDataFromDB}
          onLogout={logout}
          canSaveToDB={canSaveToDB}
        />
        <Divider m="0" />
        <Stack justify={selectedFile === null ? "center" : "flex-start"} c="dark.2" style={{ flexShrink: 0, flexGrow: 1 }} gap="0">
          {selectedFile !== null ? (
            <>
              <Text px="5" py="1" fw={500}>
                {selectedFile.name}
              </Text>
              {editorOrViewer === "editor" ? <MarkdownEditor isFileSelected={selectedFile !== null} body={textEditor} onChange={handleChangeTextEditor} /> : <MarkdownViewer body={textEditor} />}
            </>
          ) : (
            <Text p="lg" ta="center">
              No file selected. Select a file from the file explorer, or create a new file.
            </Text>
          )}
        </Stack>
      </Stack>
      <MobileSidebar
        data={data}
        onToggleExpandFolder={handleToggleExpandFolder}
        onUpdateItemName={handleUpdateItemName}
        onEditItem={handleEditItem}
        onAddFileTab={handleAddFileTab}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onSelectFile={handleSelectFile}
        fileExplorerOpened={fileExplorerOpened}
        onClose={close}
      />
      {/* </DimensionsContext.Provider> */}
    </>
  );
};

export default MainPage;
