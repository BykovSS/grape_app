import * as React from 'react';
import '../assets/less/header.less';

type Props = {
    title: string
}

export const Header:React.FC<Props> = (props) => {
    const {title} = props;

  return <h1 className={'main_header'}>{title}</h1>;
};