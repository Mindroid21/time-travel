import React, { FunctionComponent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// icons
import EditIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import MoveToTopIcon from '@material-ui/icons/VerticalAlignTop';
import { SvgIconProps } from '@material-ui/core';


interface ITimerOptionProps {
  id: string;
  onEdit: (item: string) => void;
  onDelete: (item: string) => void;
  onMoveToTop: (item: string) => void;
};

interface ITimerOptions {
  label: LABEL_OPTIONS;
  icon: JSX.Element;
  action: (item: string) => void;
}

export enum LABEL_OPTIONS {
  EDIT = 'Edit',
  DELETE = 'Delete',
  MOVE = 'Move to Top'
};



const ITEM_HEIGHT = 48;

const TimerOptions: FunctionComponent<ITimerOptionProps> = (props)=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { id, onEdit, onDelete, onMoveToTop } = props;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (item: string) => {
    onEdit(item);
  };

  const handleDelete = (item: string) => {
    onDelete(item);
  };

  const handleSelected = (item: string) => {
    onMoveToTop(item);
  }

  const options: ITimerOptions[] = [
    {
      label: LABEL_OPTIONS.EDIT,
      icon: <EditIcon color='primary'/>,
      action: handleEdit,
    },
    {
      label: LABEL_OPTIONS.DELETE,
      icon: <DeleteIcon color='primary'/>,
      action: handleDelete,
    },
    {
      label: LABEL_OPTIONS.MOVE,
      icon: <MoveToTopIcon color='primary'/>,
      action: handleSelected,
    }
  ];

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((item, index) => (
          <MenuItem key={index} onClick={item.action.bind(null,id)}>
            {item.icon}&nbsp;{item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default TimerOptions;