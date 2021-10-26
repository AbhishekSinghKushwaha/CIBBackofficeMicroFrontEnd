export function disposeStyles(): void {
    const holder: HTMLElement = document.getElementsByTagName('head')[0];
    const styleElements: HTMLCollectionOf<HTMLStyleElement> = holder.getElementsByTagName('style');
    for (let i = 0; i < styleElements.length; i++) {
        holder.removeChild(styleElements[i]);
    }
}
