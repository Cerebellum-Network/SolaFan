import {ComponentType} from 'react';

type ApplicationModalContainerViewProps = {
  component?: ComponentType;
  componentProps?: any;
};

export const ApplicationModalContainerView = ({component, componentProps}: ApplicationModalContainerViewProps) => {
  const ModalComponent = component;

  if (!ModalComponent) {
    return null;
  }

  return <ModalComponent {...componentProps} />;
};
