import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions';
import {AddRightColumn} from '../../components/icons/AddRightColumn';
import '../../assets/less/buttons.less';

const AddRightRowButton:React.FC = () => {
  const dispatch = useDispatch();

    const handleAddRightRow = React.useCallback(() => {
        dispatch(actions.addRightRow());
    }, [dispatch]);

  return <button
      className={'add_button add_button__right'}
      title={'Добавить ряд справа'}
      onClick={handleAddRightRow}
  ><AddRightColumn/></button>;
};

export default AddRightRowButton;