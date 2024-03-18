const testData = [
  {
    id: 1,
    parentFolderIds: [],
    type: 'Folder',
    name: 'Folder 1',
    expand: false,
    isEditing: false,
    items: [
      {
        id: 2,
        parentFolderIds: [1],
        type: 'Folder',
        name: 'Folder 2',
        expand: false,
        isEditing: false,
        items: [],
      },
      {
        id: 3,
        parentFolderIds: [1],
        type: 'Folder',
        name: 'Folder 3',
        expand: false,
        isEditing: false,
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
    isEditing: false,
    items: [
      {
        id: 5,
        parentFolderIds: [4],
        type: 'Folder',
        name: 'Folder 5',
        expand: false,
        isEditing: false,
        items: [
          {
            id: 6,
            parentFolderIds: [4, 5],
            type: 'Folder',
            name: 'Folder 6',
            expand: false,
            isEditing: false,
            items: [],
          },
        ],
      },
    ],
  },
];

export default testData;
