import * as React from 'react';
// import {useDispatch, useSelector, shallowEqual} from 'react-redux';
// import * as actions from '../../actions';
import {ButtonsGroup} from '../../components/buttons/ButtonsGroup';
import {Undo} from '../../components/icons/Undo';
import {ReturnUndo} from '../../components/icons/ReturnUndo';
import '../../assets/less/buttons.less';

type Props = {
    hide?: boolean
}

const UndoAndReturnUndoButtons:React.FC<Props> = (props) => {

    const {hide} = props;
    // const {logOrder, logs} = useSelector((state: any) => state, shallowEqual);
    // const dispatch = useDispatch();

    const handleClickUndoButton = React.useCallback(() => {
        console.log('Undo button clicked!!!');
    }, []);

    const handleClickReturnUndoButton = React.useCallback(() => {
        console.log('ReturnUndo button clicked!!!');
    }, []);

    return !hide && <ButtonsGroup
        className={'undo-and-return-undo_buttons'}
        isButton_01={false}
        Button_02_ClassName={'undo-and-return-undo_button undo_button'}
        Button_02_Title={'Отменить действие'}
        Button_02_Disable={/*logOrder === 0*/false}
        handleClickButton_02={handleClickUndoButton}
        Button_02_Label={<Undo/>}
        Button_03_ClassName={'undo-and-return-undo_button return-undo_button'}
        Button_03_Title={'Вернуть отммененное действие'}
        Button_03_Disable={/*logs && logOrder === logs.length*/false}
        handleClickButton_03={handleClickReturnUndoButton}
        Button_03_Label={<ReturnUndo />}
        isButton_04={false}
    />;
};

export default UndoAndReturnUndoButtons;