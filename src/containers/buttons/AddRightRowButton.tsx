import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions';
import '../../assets/less/buttons.less';

const AddRightRowButton:React.FC = () => {
  const dispatch = useDispatch();

    const handleAddRightRow = React.useCallback(() => {
        dispatch(actions.addRightRow());
    }, [dispatch]);

  return <button
      className={'add_button add_button__right'}
      onClick={handleAddRightRow}
  >Добавить ряд справа</button>;
};

export default AddRightRowButton;