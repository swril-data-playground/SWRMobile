export interface accordionItem {
	header: string;
    content: string;
}

export interface accordionItemImage {
    header: string;
    content: {
        text: string;
        image: any;
    }
}