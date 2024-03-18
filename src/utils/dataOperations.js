import { v4 as uuidv4 } from 'uuid';

export const addFolder = (
  currentFolder,
  currentIndex,
  idChain,
  targetFolderId
) => {
  if (idChain === null) {
    return [
      {
        id: uuidv4(),
        parentFolderIds: [],
        type: 'Folder',
        name: 'Folder 1',
        expand: false,
        isEditing: true,
        items: [],
      },
    ];
  } else if (currentIndex === idChain.length) {
    currentFolder = currentFolder.map((folder) => {
      if (folder.id === targetFolderId) {
        // folder.expand = true;
        folder.items = [
          {
            id: uuidv4,
            parentFolderIds: [...idChain, targetFolderId],
            type: 'Folder',
            name: 'Untitled',
            expand: false,
            isEditing: true,
            items: [],
          },
          ...folder.items,
        ];
      }
      return folder;
    });
    return currentFolder;
  } else {
    currentFolder = currentFolder.map((folder) => {
      if (folder.id === idChain[currentIndex]) {
        folder.items = addFolder(
          folder.items,
          currentIndex + 1,
          idChain,
          targetFolderId
        );
      }
      return folder;
    });
    return currentFolder;
  }
};

// Handles the appearance of the input for the name of a folder (while a user is editing the name).
//
export const toggleEditFolder = (
  currentFolder,
  currentIndex,
  idChain,
  targetFolderId
) => {
  // console.log('CURRENT FOLDER');
  // console.log(currentFolder);
  // console.log(currentIndex);
  // console.log(idChain);
  // console.log(targetFolderId);
  if (idChain.length === 0) {
    const newData = currentFolder.map((folder) => {
      if (folder.id === targetFolderId) {
        folder.isEditing = !folder.isEditing;
      }
      return folder;
    });
    return newData;
  } else if (currentIndex === idChain.length) {
    currentFolder = currentFolder.map((folder) => {
      if (folder.id === targetFolderId) {
        folder.isEditing = !folder.isEditing;
      }
      return folder;
    });
    return currentFolder;
  } else {
    currentFolder = currentFolder.map((folder) => {
      if (folder.id === idChain[currentIndex]) {
        folder.items = toggleEditFolder(
          folder.items,
          currentIndex + 1,
          idChain,
          targetFolderId
        );
      }
      return folder;
    });
    return currentFolder;
  }
};

// Handles the updating of a folder name.
//
export const updateFolder = (
  currentFolder,
  currentIndex,
  idChain,
  targetFolderId,
  newFolderName
) => {
  if (idChain.length === 0) {
    const newData = currentFolder.map((folder) => {
      if (folder.id === targetFolderId) {
        folder.name = newFolderName;
      }
      return folder;
    });
    return newData;
  } else if (currentIndex === idChain.length) {
    currentFolder = currentFolder.map((folder) => {
      if (folder.id === targetFolderId) {
        folder.name = newFolderName;
      }
      return folder;
    });
    return currentFolder;
  } else {
    currentFolder = currentFolder.map((folder) => {
      if (folder.id === idChain[currentIndex]) {
        folder.items = updateFolder(
          folder.items,
          currentIndex + 1,
          idChain,
          targetFolderId,
          newFolderName
        );
      }
      return folder;
    });
    return currentFolder;
  }
}; // END updateFolder

// Handles the expanding/minimising of a folder tab.
//
export const toggleExpandFolder = (
  currentFolder,
  currentIndex,
  idChain,
  targetFolderId
) => {
  if (idChain.length === 0) {
    console.log('HERE');
    const newData = currentFolder.map((folder) => {
      if (folder.id === targetFolderId) {
        folder.expand = !folder.expand;
      }
      return folder;
    });
    return newData;
  } else if (currentIndex === idChain.length) {
    currentFolder = currentFolder.map((folder) => {
      if (folder.id === targetFolderId) {
        folder.expand = !folder.expand;
      }
      return folder;
    });
    return currentFolder;
  } else {
    currentFolder = currentFolder.map((folder) => {
      if (folder.id === idChain[currentIndex]) {
        folder.items = toggleExpandFolder(
          folder.items,
          currentIndex + 1,
          idChain,
          targetFolderId
        );
      }
      return folder;
    });
    return currentFolder;
  }
}; // END toggleExpandFolder
