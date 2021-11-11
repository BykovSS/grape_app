import * as React from 'react';
import {useSelector} from 'react-redux';
import {getAge, getInitialTableData} from '../utils';
import '../assets/less/report.less';
import {dataType} from '../types';
import {Icon} from './icons/Icon';

export const Report: React.FC = () => {

    const {data, guide} = useSelector((state: any) => state);

    const tableData = getInitialTableData(guide);

    data.forEach((item: dataType) => {
        const {sort, year} = item;
        const age = getAge(year);
        tableData.forEach(elem => {
            if (sort === elem.id) {
                if (age === null) elem.a_0++;
                else if (typeof age === 'number' && age <= 0) elem.a_1++;
                else if (age === 1) elem.a_2++;
                else if (age === 2) elem.a_3++;
                else elem.a_4++;
            }
        });
    });

    return <div className={'report'}>
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
                <td className={'report-number'}>{tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_1 + item.a_2 + item.a_3 + item.a_4;
                }, 0)}</td>
                <td className={'report-number'}>{tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_1;
                }, 0)}</td>
                <td className={'report-number'}>{tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_2;
                }, 0)}</td>
                <td className={'report-number'}>{tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_3;
                }, 0)}</td>
                <td className={'report-number'}>{tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_4;
                }, 0)}</td>
                <td className={'report-number'}>{tableData.reduce((result, item) => {
                    if (item.type === 'free' || item.type === 'hatching') return result;
                    else return result + item.a_0;
                }, 0)}</td>
            </tr>
            </tfoot>
        </table>
    </div>;
};