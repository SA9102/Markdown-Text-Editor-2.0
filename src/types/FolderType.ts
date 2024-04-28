import FileType from './FileType';
import FileAndFolderTreeType from './FileAndFolderTreeType';

type FolderType = {
  id: string;
  parentFolderIds: string[];
  type: string;
  name: string;
  isExpand: boolean;
  isEditingName: boolean;
  items: FileAndFolderTreeType;
};

export default FolderType;
