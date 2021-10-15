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
                if (typeof age === 'number' && age <= 0) elem.a_1++;
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
                    <th rowSpan={2}>{'Всего'}</th>
                    <th colSpan={4}>{'из них (возраст):'}</th>
                </tr>
                <tr>
                    <th>{'1 год'}</th>
                    <th>{'2 года'}</th>
                    <th>{'3 года'}</th>
                    <th>{'4+ года'}</th>
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
				</tr>)}
                {tableData && tableData.map((elem, i) => elem.type === 'free' && <tr key={i}>
					<td>{elem.label}</td>
					<td><div className={'report-sort_icon'}><Icon sort={elem.id}/></div></td>
					<td className={'report-number'}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</td>
					<td/><td/><td/><td/>
				</tr>)}
                {tableData && tableData.map((elem, i) => elem.type === 'hatching' && <tr key={i}>
					<td>{elem.label}</td>
					<td><div className={'report-sort_icon'}><Icon sort={elem.id}/></div></td>
					<td className={'report-number'}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</td>
					<td/><td/><td/><td/>
				</tr>)}
            </tbody>
            <tfoot>
            <td colSpan={2}>{'Итого'}</td>
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
            </tfoot>
        </table>
    </div>;
};