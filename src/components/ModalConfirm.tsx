import {createRef, useState, useImperativeHandle} from 'react';

const ModalConfirmRef: any = createRef();

export const Confirm = {
  show: (payload: any) => {
    ModalConfirmRef.current?.show?.(payload);
  },
  hide: () => {
    ModalConfirmRef.current?.hide?.();
  },
};

type Payload = {
  title?: string;
  desc?: string;
  labelCancel?: string;
  labelAccept?: string;
  onAccept?: () => void;
  onCancel?: () => void;
};

const initData: Payload = {
  title: 'Confirm',
  desc: 'Are you sure?',
  labelCancel: 'Cancel',
  labelAccept: 'Delete',
};

export default function ModalConfirm() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(initData as Payload);

  const handleAccept = async () => {
    await data?.onAccept?.();
  };

  const handleCancel = () => {
    setOpen(false);
    data?.onCancel?.();
  };

  useImperativeHandle(ModalConfirmRef, () => ({
    show: (payload: any) => {
      setData({...initData, ...payload});
      setOpen(true);
    },
    hide: () => {
      setOpen(false);
    },
  }));

  return (
    <>
      <>{data.title}</>
      <>{data.desc}</>
      {!data.onAccept && <>{data.labelAccept}</>}
      <>{data.labelCancel}</>
    </>
  );
}
