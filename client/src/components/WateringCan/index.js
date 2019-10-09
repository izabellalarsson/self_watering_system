import React, { useEffect, useState } from 'react';
import { SVG, Group, Can, Water } from './style';
import { drag, useSpring } from 'framer-motion';

const WateringCan = ({ updateIsDraggingCan, isWatering, setIsWatering }) => {
  const rotate = useSpring(0);
  const [showWater, setShowWater] = useState(false);

  useEffect(() => {
    if(isWatering) {
      rotate.set(-45);
      setShowWater(true);
    } else {
      rotate.set(0);
      setShowWater(false);
    }
  }, [isWatering]);

  return (
    <Can
      drag
      dragMomentum={false}
      onDragStart={() => updateIsDraggingCan(true)}
      onDragEnd={() => {
        updateIsDraggingCan(false);
        setIsWatering(false);
      }}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      style={{ rotate }}
    >
      <SVG
        fill="none"
        height="130"
        width="160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Group fill="#c4c4c4">
          <path d="M110.422 40.987l-58.664-.436-.676 90.998 58.664.435z" />
          <rect
            height="87.764"
            rx="3"
            transform="matrix(-.72302 .69083 .68953 .72425 21.04 52.598)"
            width="13.778"
          />
          <path d="M106.488 60.94l-4.999-.037.017-2.414 1.901-1.487zm23.182.172l3.8-3.25 1.146 1.34.052 1.762zm1.134 38.4l4.998-.147.048 1.635-.927 1.347zm-9.087 13.204l4.119 2.835a5.003 5.003 0 01-5.335 2.015zm-15.584-3.908l-1.216 4.85-3.813-.956.029-3.931zm-2.726-51.806c6.512-5.095 12.917-6.436 18.456-5.52 5.327.881 9.377 3.772 11.607 6.38l-7.6 6.5c-.896-1.049-2.918-2.564-5.639-3.014-2.51-.415-6.132-.014-10.661 3.53zm31.261 3.963l1.134 38.4-9.996.295-1.134-38.4zm.255 41.382l-9.087 13.204-8.238-5.67 9.088-13.203zm-14.422 15.219l-15.584-3.908 2.432-9.699 15.584 3.907zm-19.368-8.795l.356-47.868 9.999.074-.355 47.869z" />
        </Group>
      </SVG>

      <Water style={{ opacity: showWater ? 1 : 0, transitionDelay: showWater ? '0.3s' : '0s'}} fill="none" height="314" width="109" xmlns="http://www.w3.org/2000/svg"><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="52" x2="52" y1="86.583" y2="309.982"><stop offset=".365" stop-color="#9cfffa"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><path d="m21 309.982 12-223.4h37.5l12.5 223.4z" fill="url(#a)"/><g fill="#9cfffa"><path d="m70 86.181h-36.29l19.29-45.805 17.5-22.5 11.5-9.243 13-7.633 1 7.634-12 14.466-6.5 18.884-3.5 25.312z"/><path d="m33.71 86.181-.462-.194-.292.694h.753v-.5zm36.29 0v.5a.5.5 0 0 0 .49-.396l-.49-.105zm26-77.547.385.32.14-.168-.03-.217zm-1-7.634.496-.065-.098-.748-.651.382zm-42 39.376-.395-.307-.04.052-.026.061zm17.5-22.5-.313-.39-.046.036-.036.047.395.306zm11.5-9.243-.253-.431-.032.019-.028.022zm-8 58.662.49.104.003-.017.002-.018zm3.5-25.313-.473-.162-.016.046-.006.048zm6.5-18.882-.385-.32-.058.07-.03.087zm-50.29 63.58h36.29v-1h-36.29zm62.785-78.111-1-7.634-.992.13 1 7.634zm-43.956 31.613-19.289 45.805.921.388 19.289-45.805-.92-.388zm17.566-22.614-17.5 22.501.79.614 17.5-22.5-.79-.614zm24.642-17-13 7.635.506.862 13-7.634-.506-.862zm-13.06 7.676-11.5 9.242.626.78 11.5-9.242zm-11.198 78.04 4-18.884-.978-.207-4 18.884.978.208zm4.006-18.919 3.5-25.313-.99-.137-3.5 25.313zm3.478-25.219 6.5-18.884-.946-.326-6.5 18.885zm6.412-18.728 12-14.465-.77-.638-12 14.465z"/></g></Water>

    </Can>
  );
};

export default WateringCan;
