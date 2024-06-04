type onToggleEditType = (arg0: string[], arg1: string) => void;
type onDelete = (arg0: string[], arg1: string, arg2: string) => void;
type onToggleEdit = (arg0: string[], arg1: string) => void;
type onUpdateName = (arg0: string[], arg1: string, arg2: string) => void;
type onAdd = (arg0: string[] | null, arg1: string | null, arg2: string) => void;
type onToggleExpand = (arg0: string[], arg1: string, arg2: boolean) => void;
type onSelectFile = (arg0: string, arg1: string[], arg2: string) => void;
type onAddFileTab = (arg0: string, arg1: string, arg2: string[]) => void;

export type { onToggleEditType, onDelete, onToggleEdit, onUpdateName, onAdd, onToggleExpand, onSelectFile, onAddFileTab };
