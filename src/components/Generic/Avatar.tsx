import React from 'react';
import type { PatientProfile } from '../../contract/types';
import { Size } from '../DesignEnums/Sizes';
import { styles } from '../DesignEnums/MessageType';

type AvatarProps =
  | { src: string }
  | { children: string; }
  & {
    size?: Size
  };

const sizeClasses: Record<Size, string> = {
  SMALL: 'w-8 h-8 text-sm',
  MEDIUM: 'w-12 h-12 text-lg',
  LARGE: 'w-16 h-16 text-xl',
};

export const Avatar: React.FC<AvatarProps> = ({ size = 'MEDIUM', ...props }) => {
  let element: React.ReactNode;
  if ('src' in props) {
    element = <img src={props.src} alt="Avatar" className="rounded-full w-full h-full object-cover" />;
  } else {
    element = props.children;
  }

  return (
    <div className={`inline-flex items-center justify-center rounded-full ${styles.ACCENT.background} text-white ${sizeClasses[size]}`}>
      {element}
    </div>
  );
};

type ProfileAvatarProps = {
  profile: PatientProfile;
  size?: Size;
};

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ profile, size }) => {
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;
  return <Avatar size={size}>{initials}</Avatar>;
};