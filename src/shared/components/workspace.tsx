import React, {PropsWithChildren} from 'react';
import {
  StyledText,
  StyledTextInput,
  StyledTouchOpacity,
  StyledView,
} from '../styled/components';
import {getFirstLetter} from 'src/shared/helpers/get-first-letter';

interface WorkspaceContextParams {
  title?: string;
  id?: string;
  onUpdate?: (newTitle: string) => void;
  onSelect?: (id: string) => void;
}
const initialValues: WorkspaceContextParams = {
  title: '',
  id: '',
  onSelect: (_id: string) => {},
  onUpdate: (_newTitle: string) => {},
};

const WorkspaceContext =
  React.createContext<WorkspaceContextParams>(initialValues);

export function WorkpaceProvider({
  children,
  id,
  title,
  onUpdate,
  onSelect,
}: PropsWithChildren<WorkspaceContextParams>) {
  function onUpdateFn(newTitle: string) {
    return onUpdate?.(newTitle);
  }
  const value = React.useMemo(
    () => ({
      title: title ?? '',
      id:id ?? '',
      onUpdate: onUpdateFn,
      onSelect,
    }),
    [title, onUpdate, onSelect],
  );
  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function WorkspaceTitle({children}: PropsWithChildren) {
  const {title} = useWorkspace();

  return (
    <StyledText marginX={13} color="lightBlack" fontWeight="500" fontSize={17}>
      {title}
    </StyledText>
  );
}

export function WorkspaceTag({
  children,
  selected,
}: PropsWithChildren<{selected?: boolean}>) {
  const {title, onSelect, id} = useWorkspace();
 
  return (
    <StyledTouchOpacity
      onPress={() => onSelect?.(id ?? '')}
      width={60}
      height={60}
      borderRadius={15}
      bg={selected ? 'blue' : 'darkSnowGray'}
      display="flex"
      justifyContent="center"
      alignItems="center">
      <StyledText
        color={selected ? 'white' : 'lightBlack'}
        fontSize={30}
        fontWeight="bold">
        {getFirstLetter(title ?? '')}
      </StyledText>
    </StyledTouchOpacity>
  );
}
export function WorkspaceEditableTitle({children}: PropsWithChildren) {
  const {title, onUpdate} = useWorkspace();
  const [newTitle, setNewTitle] = React.useState(title);
  return (
    <StyledTextInput
      variant=""
      value={newTitle}
      onChangeText={setNewTitle}
      marginX={13}
      color="lightBlack"
      fontWeight="500"
      onBlur={() => onUpdate?.(newTitle ?? '')}
      fontSize={17}
    />
  );
}

function useWorkspace() {
  const context = React.useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useToggle Must be used in <Workspace/> Context');
  }
  return context;
}
