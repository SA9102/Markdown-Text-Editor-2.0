const testData = [
  {
    id: 99,
    parentFolderIds: [],
    type: 'File',
    name: 'New File',
    body: '',
    isSelected: false,
    isEditingName: false,
  },
  {
    id: 1,
    parentFolderIds: [],
    type: 'Folder',
    name: 'Folder 1',
    expand: false,
    isEditingName: false,
    items: [
      {
        id: 2,
        parentFolderIds: [1],
        type: 'Folder',
        name: 'Folder 2',
        expand: false,
        isEditingName: false,
        items: [],
      },
      {
        id: 3,
        parentFolderIds: [1],
        type: 'Folder',
        name: 'Folder 3',
        expand: false,
        isEditingName: false,
        items: [],
      },
    ],
  },
  {
    id: 4,
    parentFolderIds: [],
    type: 'Folder',
    name: 'Folder 4',
    expand: false,
    isEditingName: false,
    items: [
      {
        id: 5,
        parentFolderIds: [4],
        type: 'Folder',
        name: 'Folder 5',
        expand: false,
        isEditingName: false,
        items: [
          {
            id: 6,
            parentFolderIds: [4, 5],
            type: 'Folder',
            name: 'Folder 6',
            expand: false,
            isEditingName: false,
            items: [
              {
                id: 7,
                parentFolderIds: [4, 5, 6],
                type: 'Folder',
                name: 'Folder 7',
                expand: false,
                isEditingName: false,
                items: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default testData;
