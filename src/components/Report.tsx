import * as React from 'react';
import {Icon} from './icons/Icon';
import FieldHeader from '../containers/FieldHeader';
import {EntityType} from '../types';
import '../assets/less/report.less';
import '../assets/less/buttons.less';

type Props = {
    tableData: (EntityType & {a_0?: number, a_1?: number, a_2?: number, a_3?: number, a_4?: number})[]
    isGeneral: boolean
    fieldCount: number
    handleChangeGeneral: () => void
}

export const Report: React.FC<Props> = (props) => {

    const {tableData, isGeneral, fieldCount, handleChangeGeneral} = props;

    return <div className={'report'}>
        <FieldHeader inReport isGeneral={isGeneral} fieldCount={fieldCount}/>
        <table>
            <thead>
                <tr>
                    <th rowSpan={2} className={'report-th_name'}>{'Сорт'}</th>
                    <th rowSpan={2} className={'report-th_icon'}/>
                    <th rowSpan={2} className={'report-th_sum'}>{'Всего'}</th>
                    <th colSpan={4}>{'из них (возраст):'}</th>
                    <th rowSpan={2} className={'report-th_num'}>{'Выпад'}</th>
                </tr>
                <tr>
                    <th className={'report-th_num'}>{'1 год'}</th>
                    <th className={'report-th_num'}>{'2 года'}</th>
                    <th className={'report-th_num'}>{'3 года'}</th>
                    <th className={'report-th_num'}>{'4+ года'}</th>
                </tr>
            </thead>
            <tbody>
                <tr><td colSpan={8} className={'report-header'}>{'Красные сорта'}</td></tr>
                {tableData && tableData.map((elem, i) => elem.type === 'red' && <tr key={i}>
					<td>{elem.label}</td>
                    <td><div className={'report-sort_icon'}><Icon sort={elem.id}/></div></td>
					<td className={'report-number'}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</td>
					<td className={'report-number'}>{elem.a_1}</td>
					<td className={'report-number'}>{elem.a_2}</td>
					<td className={'report-number'}>{elem.a_3}</td>
					<td className={'report-number'}>{elem.a_4}</td>
					<td className={'report-number'}>{elem.a_0}</td>
                </tr>)}
                <tr><td colSpan={8} className={'report-header'}>{'Белые сорта'}</td></tr>
                {tableData && tableData.map((elem, i) => elem.type === 'white' && <tr key={i}>
					<td>{elem.label}</td>
					<td><div className={'report-sort_icon'}><Icon sort={elem.id}/></div></td>
					<td className={'report-number'}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</td>
					<td className={'report-number'}>{elem.a_1}</td>
					<td className={'report-number'}>{elem.a_2}</td>
					<td className={'report-number'}>{elem.a_3}</td>
					<td className={'report-number'}>{elem.a_4}</td>
					<td className={'report-number'}>{elem.a_0}</td>
				</tr>)}
                <tr><td colSpan={8} className={'report-header'}>{'Остальное'}</td></tr>
                {tableData && tableData.map((elem, i) => elem.type === 'other' && <tr key={i}>
					<td>{elem.label}</td>
					<td><div className={'report-sort_icon'}><Icon sort={elem.id}/></div></td>
					<td className={'report-number'}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</td>
					<td className={'report-number'}>{elem.a_1}</td>
					<td className={'report-number'}>{elem.a_2}</td>
					<td className={'report-number'}>{elem.a_3}</td>
					<td className={'report-number'}>{elem.a_4}</td>
					<td className={'report-number'}>{elem.a_0}</td>
				</tr>)}
                {tableData && tableData.map((elem, i) => elem.type === 'free' && <tr key={i}>
					<td>{elem.label}</td>
					<td><div className={'report-sort_icon'}><Icon sort={elem.id}/></div></td>
					<td className={'report-number'}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</td>
					<td/><td/><td/><td/><td/>
				</tr>)}
                {tableData && tableData.map((elem, i) => elem.type === 'hatching' && <tr key={i}>
					<td>{elem.label}</td>
					<td className={'report-td_hatching'}><div className={'report-sort_icon'}><Icon sort={elem.id}/></div></td>
					<td className={'report-number'}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</td>
					<td/><td/><td/><td/><td/>
				</tr>)}
            </tbody>
            <tfoot>
            <tr className={'report-total'}>
                <td colSpan={2}>{'Итого '}<span>(без свободных и непригодных мест)</span></td>
                <td className={'report-number'}>{tableData && tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_1 + item.a_2 + item.a_3 + item.a_4;
                }, 0)}</td>
                <td className={'report-number'}>{tableData && tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_1;
                }, 0)}</td>
                <td className={'report-number'}>{tableData && tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_2;
                }, 0)}</td>
                <td className={'report-number'}>{tableData && tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_3;
                }, 0)}</td>
                <td className={'report-number'}>{tableData && tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_4;
                }, 0)}</td>
                <td className={'report-number'}>{tableData && tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_0;
                }, 0)}</td>
            </tr>
            </tfoot>
        </table>
        <button className={'change-report'} onClick={handleChangeGeneral}>{isGeneral ? 'Отчет по частку' : 'Общий отчет'}</button>
    </div>;
};