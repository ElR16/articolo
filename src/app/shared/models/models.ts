export interface Articolo {
    lingua: string
    title: string
    subtitle: string
    description: string
    destinationID: string
    mediaImageFile: File
    paragrafi: Paragrafi[]
}

export interface Paragrafi {
    paragraphTitle: string,
    mediaImageFile: File
    paragraphText: string
    destinationID: string
}
export interface ArticoloDb {
    id?: string
    lingua: string
    title: string
    subtitle: string
    description: string
    destinationID: string
    mediaImageId: string
    paragrafi: ParagrafoDb[]
}
export interface ParagrafoDb {

    paragraphTitle: string,
    mediaImageId: string
    paragraphText: string
    destinationID: string
}
export interface ImageDb {
    id?: string
    fileName: string
    data: string
    contentType: string
}