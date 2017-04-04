export declare module util {
    const getPushID: string;
    /**
     * path to the user AppData at this location we will create a folder call knymbusDB where all our
     * will be stored
     */
    function getAppPath(dbFileName: string): string;
}
