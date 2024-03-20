import FileType from './FileType';

type FolderType = {
  id: string;
  parentFolderIds: string[];
  type: string;
  name: string;
  isExpand: boolean;
  isEditingName: boolean;
  items: (FolderType | FileType)[];
};

export default FolderType;
