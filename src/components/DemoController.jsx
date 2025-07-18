// File: src/components/DemoController.js
import { useEffect, useRef } from 'react';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function DemoController({
  runDemo,
  navigateTo,
  openPartDetails,
  closePartDetails
}) {
  const demoRunning = useRef(false);

  const scrollTo = (selector, offset = 0) => {
    const el = document.querySelector(selector);
    if (el) {
      window.scrollTo({
        top: el.offsetTop + offset,
        behavior: 'smooth',
      });
    }
  };

  const waitForVideoEnd = async (selector) => {
    const el = document.querySelector(selector);
    const video = el?.querySelector('video');
    if (video) {
      video.loop = false;
      return new Promise(resolve => {
        const onEnd = () => {
          video.removeEventListener('ended', onEnd);
          resolve();
        };
        video.addEventListener('ended', onEnd);
        video.play().catch(() => resolve());
      });
    }
  };

  const autoScrollModal = async (selector) => {
    const modal = document.querySelector(selector);
    if (modal?.scrollHeight > modal?.clientHeight) {
      let totalScroll = modal.scrollHeight - modal.clientHeight;
      const step = 2;
      let scrolled = 0;
      return new Promise(resolve => {
        const interval = setInterval(() => {
          if (scrolled >= totalScroll) {
            clearInterval(interval);
            resolve();
          } else {
            modal.scrollTop += step;
            scrolled += step;
          }
        }, 20);
      });
    }
  };

  const runSteps = async () => {
    demoRunning.current = true;

    scrollTo('.hero');
    await delay(3000);

    navigateTo('product');
    await delay(2000);

    scrollTo('.product-overview');
    await delay(4000);

    const startButton = document.querySelector('.start-tour-button');
    if (startButton) {
      startButton.click();
      await delay(20000);
    }

    scrollTo('.technical-specs');
    await delay(4000);

    openPartDetails({
      name: 'Rotating Seat',
      description: 'Patient transfer system with 360° rotation.',
      specifications: ['Height adjustable (40-60cm)', '150kg capacity'],
      features: ['Retractable arms', 'Smooth motion control'],
    });
    await delay(6000);
    closePartDetails();
    await delay(1000);

    scrollTo('header');
    await delay(1500);

    demoRunning.current = false;
  };

  useEffect(() => {
    if (runDemo) runSteps();
  }, [runDemo]);

  return null;
}
