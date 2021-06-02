import { FC, useCallback, useEffect } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

interface IProps {
    color?: string,
    height?: number, // px
    startPosition?: number, // set the starting position of the progress bar
    stopDelay?: number, // After changing the route (or if there is an error in the router), It removes the progress bar after this delay in ms
    showSpinner?: boolean,
    startDelay?: number, // only show progress bar if it takes longer than delay ms
}

const TopProgressBar: FC<IProps> = (props) => {
    const {
        color = '#3B64B5',
        height = 2,
        startPosition = 0.4,
        stopDelay = 200,
        showSpinner = false,
        startDelay = 200,
    } = props;

    let stopDelayTimer: ReturnType<typeof setTimeout> | null = null;
    let startDelayTimer: ReturnType<typeof setTimeout> | null = null;

    const clearTimers = useCallback(() => {
        if (startDelayTimer) {
            clearTimeout(startDelayTimer);
            startDelayTimer = null;
        }
        if (stopDelayTimer) {
            clearTimeout(stopDelayTimer);
            stopDelayTimer = null;
        }
    }, [ startDelayTimer, stopDelayTimer ]);

    const routeChangeStart = useCallback(() => {
        clearTimers();
        startDelayTimer = setTimeout(() => {
            NProgress.set(startPosition);
            NProgress.start();
        }, startDelay);
    }, [ startPosition, startDelay ]);

    const routeChangeEnd = useCallback(() => {
        clearTimers();
        
        stopDelayTimer = setTimeout(() => {
            if (NProgress.isStarted()) {
                NProgress.done(true);
            }
        }, stopDelay);
    }, [ stopDelay, startDelayTimer, stopDelayTimer ]);

    useEffect(() => {
        NProgress.configure({
            showSpinner,
            trickleSpeed: 200,
            easing: 'ease',
            speed: 500,
        });
        
        Router.events.on('routeChangeStart', routeChangeStart);
        Router.events.on('routeChangeComplete', routeChangeEnd);
        Router.events.on('routeChangeError', routeChangeEnd);
    }, []);
    
    return (
        <style jsx global>{ `
            #nprogress {
                pointer-events: none;
            }
            
            #nprogress .bar {
                background: ${ color };
                position: fixed;
                z-index: 1031;
                top: 0;
                left: 0;
                width: 100%;
                height: ${ height }px;
            }
            #nprogress .peg {
                display: block;
                position: absolute;
                right: 0px;
                width: 100px;
                height: 100%;
                box-shadow: 0 0 10px ${ color }, 0 0 5px ${ color };
                opacity: 1;
                -webkit-transform: rotate(3deg) translate(0px, -4px);
                -ms-transform: rotate(3deg) translate(0px, -4px);
                transform: rotate(3deg) translate(0px, -4px);
            }
            #nprogress .spinner {
                display: block;
                position: fixed;
                z-index: 1031;
                top: 15px;
                right: 15px;
            }
            #nprogress .spinner-icon {
                width: 18px;
                height: 18px;
                box-sizing: border-box;
                border: solid 2px transparent;
                border-top-color: ${ color };
                border-left-color: ${ color };
                border-radius: 50%;
                -webkit-animation: nprogresss-spinner 400ms linear infinite;
                animation: nprogress-spinner 400ms linear infinite;
            }
            .nprogress-custom-parent {
                overflow: hidden;
                position: relative;
            }
            .nprogress-custom-parent #nprogress .spinner,
            .nprogress-custom-parent #nprogress .bar {
                position: absolute;
            }
            @-webkit-keyframes nprogress-spinner {
                0% {
                    -webkit-transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                }
            }
            @keyframes nprogress-spinner {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
      ` }</style>
    );
};

export default TopProgressBar;
