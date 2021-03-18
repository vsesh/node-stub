export default async function copyDocumentToS3 (url: string) : Promise<string> {
    return url.split('').reverse().join('');
}
