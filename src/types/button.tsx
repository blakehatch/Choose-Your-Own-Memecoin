export type ButtonI = {
    icon?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | null;
    disabled?: boolean;
    overrideEnabled?: boolean;
    [key: string]: string | number | boolean | React.ReactNode | React.MouseEventHandler<HTMLButtonElement> | null;
};
  