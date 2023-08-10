export function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "0:";
    var mDisplay = m > 0 ? m + (m == 1 ? " : " : ":") : "0:";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "0";
    return hDisplay + mDisplay + sDisplay; 
}