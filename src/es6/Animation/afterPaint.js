/**
 * Run callback after next paint
 * @link https://www.webperf.tips/tip/measuring-paint-time/
 * @author Joe Liccini
 * @param {Function} callback - Callback to run
 * @return {void}
 */
export function afterPaint( callback ) {
    requestAnimationFrame( () => {
        let undef;
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = callback;
        messageChannel.port2.postMessage( undef );
    } );
}
