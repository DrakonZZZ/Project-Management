'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiSettings4Fill } from 'react-icons/ri';
import { BiSolidUser, BiSolidCalendarEdit } from 'react-icons/bi';
import { BsFillGridFill } from 'react-icons/bs';

const icons = {
  Settings: RiSettings4Fill,
  Calender: BiSolidCalendarEdit,
  User: BiSolidUser,
  Home: BsFillGridFill,
};

const SidebarLink = ({ link }) => {
  const pathname = usePathname();
  let activeLink = false;

  if (pathname === link.link) {
    activeLink = true;
  }

  //   const Icon = icons[link.icon];
  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={`stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out ${
          activeLink && 'stroke-violet-600'
        }`}
      />
    </Link>
  );
};

export default SidebarLink;
