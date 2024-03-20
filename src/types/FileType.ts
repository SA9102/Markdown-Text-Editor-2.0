type FileType = {
  id: string;
  parentFolderIds: string[];
  type: string;
  name: string;
  body: string;
  isSelected: boolean;
  isEditingName: boolean;
};

export default FileType;
