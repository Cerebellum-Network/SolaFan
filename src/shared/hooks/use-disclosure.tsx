import {useCallback, useState} from 'react';

export interface UseDisclosureProps {
  defaultIsOpen?: boolean;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export const useDisclosure = (
  {defaultIsOpen = false}: UseDisclosureProps = {defaultIsOpen: false},
): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prevState) => !prevState), []);

  return {isOpen, onOpen, onClose, onToggle};
};
