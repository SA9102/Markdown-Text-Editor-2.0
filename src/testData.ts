const testData = [
    {},
    {
        id: 1,
        parentFolderIds: [],
        type: 'Folder',
        name: 'Folder 1',
        isExpand: false,
        isEditingName: false,
        items: [
            {
                id: 2,
                parentFolderIds: [1],
                type: 'Folder',
                name: 'Folder 2',
                isExpand: false,
                isEditingName: false,
                items: [],
            },
            {
                id: 3,
                parentFolderIds: [1],
                type: 'Folder',
                name: 'Folder 3',
                isExpand: false,
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
        isExpand: false,
        isEditingName: false,
        items: [
            {
                id: 5,
                parentFolderIds: [4],
                type: 'Folder',
                name: 'Folder 5',
                isExpand: false,
                isEditingName: false,
                items: [
                    {
                        id: 6,
                        parentFolderIds: [4, 5],
                        type: 'Folder',
                        name: 'Folder 6',
                        isExpand: false,
                        isEditingName: false,
                        items: [
                            {
                                id: 7,
                                parentFolderIds: [4, 5, 6],
                                type: 'Folder',
                                name: 'Folder 7',
                                isExpand: false,
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
