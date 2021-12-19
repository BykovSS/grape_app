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
    title: string
    isMobil: boolean
    handleChangeGeneral: () => void
    handleSaveToPdf: () => void
}

export const Report: React.FC<Props> = (props) => {

    const {tableData, isGeneral, fieldCount, title, isMobil, handleChangeGeneral, handleSaveToPdf} = props;

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
                    <td className={'report-sort_icon-wrap'}><div className={'report-sort_icon'}><Icon sort={elem.id} zoom={0.86}/></div></td>
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
					<td className={'report-sort_icon-wrap'}><div className={'report-sort_icon'}><Icon sort={elem.id} zoom={0.9}/></div></td>
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
					<td className={'report-sort_icon-wrap'}><div className={'report-sort_icon'}><Icon sort={elem.id} zoom={0.8}/></div></td>
					<td className={'report-number'}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</td>
					<td className={'report-number'}>{elem.a_1}</td>
					<td className={'report-number'}>{elem.a_2}</td>
					<td className={'report-number'}>{elem.a_3}</td>
					<td className={'report-number'}>{elem.a_4}</td>
					<td className={'report-number'}>{elem.a_0}</td>
				</tr>)}
                {tableData && tableData.map((elem, i) => elem.type === 'free' && <tr key={i}>
					<td>{elem.label}</td>
					<td className={'report-sort_icon-wrap'}><div className={'report-sort_icon'}><Icon sort={elem.id}/></div></td>
					<td className={'report-number'}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</td>
					<td/><td/><td/><td/><td/>
				</tr>)}
                {tableData && tableData.map((elem, i) => elem.type === 'hatching' && <tr key={i}>
					<td className={'report-sort_icon-wrap'}>{elem.label}</td>
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
        <div className={'footer-buttons'}>
            <button className={'change-report'} onClick={handleChangeGeneral}>{isGeneral ? 'Отчет по частку' : 'Общий отчет'}</button>
            {!isMobil && <button className={'save-to-pdf'} onClick={handleSaveToPdf}>{'Сохранить в pdf'}</button>}
        </div>
        <div style={{display:'none'}}>
            <div id={'pdfContent'} style={{fontFamily:'GothamPro'}}>
                <h2 style={{textAlign: 'center'}}>{isGeneral ? 'Общий отчет по всем участкам (' + fieldCount + ' шт.)' : title}</h2>
                <div style={{fontSize:'17px', border: '1px solid #ddd', width: '1024px'}}>
                    <div style={{background: '#efefef', textAlign: 'center', borderBottom: '1px solid #ddd', display: 'flex'}}>
                        <div style={{width: '338px', height: '20px', borderRight: '1px solid #ddd', padding: '21px 0'}}>Сорт</div>
                        <div style={{width: '33px', height: '30px', borderRight: '1px solid #ddd', padding: '17px 13px 15px 13px'}}>
                            <img src={'../img/icon.png'} style={{width: '28px', height: '28px'}} alt={''}/>
                        </div>
                        <div style={{width: '97px', height: '20px', borderRight: '1px solid #ddd', padding: '21px 12px 21px 5px'}}>Всего</div>
                        <div style={{width: '410px', height: '62px', borderRight: '1px solid #ddd'}}>
                            <div style={{width: '410px', height: '21px', borderBottom: '1px solid #ddd', padding: '5px 0'}}>из   них   (возраст):</div>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px 10px 5px 0'}}>1 год</div>
                                <div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px 10px 5px 0'}}>2 года</div>
                                <div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px 10px 5px 0'}}>3 года</div>
                                <div style={{width: '92px', height: '21px', padding: '5px 10px 5px 0'}}>4+ года</div>
                            </div>
                        </div>
                        <div style={{width: '90px', height: '20px', padding: '21px 12px 21px 5px'}}>Выпад</div>
                    </div>
                    <div style={{textDecoration:'underline', borderBottom: '1px solid #ddd', height: '21px', padding: '5px'}}>Красные сорта</div>
                    {tableData && tableData.map((elem, i) => elem.type === 'red' && <div key={i} style={{borderBottom: '1px solid #ddd', display: 'flex'}}>
						<div style={{width: '323px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}>{elem.label}</div>
						<div style={{width: '49px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}><div style={{textAlign: 'center'}}><Icon sort={elem.id} forPDF/></div></div>
						<div style={{width: '102px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_1}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_2}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_3}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_4}</div>
						<div style={{width: '90px', height: '21px', padding: '5px', textAlign: 'center'}}>{elem.a_0}</div>
					</div>)}
                    <div style={{textDecoration:'underline', borderBottom: '1px solid #ddd', height: '21px', padding: '5px'}}>Белые сорта</div>
                    {tableData && tableData.map((elem, i) => elem.type === 'white' && <div key={i} style={{borderBottom: '1px solid #ddd', display: 'flex'}}>
						<div style={{width: '323px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}>{elem.label}</div>
						<div style={{width: '49px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}><div style={{textAlign: 'center'}}><Icon sort={elem.id} forPDF/></div></div>
						<div style={{width: '102px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_1}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_2}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_3}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_4}</div>
						<div style={{width: '90px', height: '21px', padding: '5px', textAlign: 'center'}}>{elem.a_0}</div>
					</div>)}
                    <div style={{textDecoration:'underline', borderBottom: '1px solid #ddd', height: '21px', padding: '5px'}}>Остальное</div>
                    {tableData && tableData.map((elem, i) => elem.type === 'other' && <div key={i} style={{borderBottom: '1px solid #ddd', display: 'flex'}}>
						<div style={{width: '323px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}>{elem.label}</div>
						<div style={{width: '49px', height: '25px', borderRight: '1px solid #ddd', padding: '3px 5px'}}><div style={{textAlign: 'center'}}><Icon sort={elem.id} forPDF/></div></div>
						<div style={{width: '102px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_1}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_2}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_3}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_4}</div>
						<div style={{width: '90px', height: '21px', padding: '5px', textAlign: 'center'}}>{elem.a_0}</div>
					</div>)}
                    {tableData && tableData.map((elem, i) => elem.type === 'free' && <div key={i} style={{borderBottom: '1px solid #ddd', display: 'flex'}}>
						<div style={{width: '323px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}>{elem.label}</div>
						<div style={{width: '51px', height: '23px', borderRight: '1px solid #ddd', padding: '4px'}}><div style={{textAlign: 'center'}}><Icon sort={elem.id} forPDF/></div></div>
						<div style={{width: '102px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}/>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}/>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}/>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}/>
						<div style={{width: '90px', height: '21px', padding: '5px'}}/>
					</div>)}
                    {tableData && tableData.map((elem, i) => elem.type === 'hatching' && <div key={i} style={{borderBottom: '1px solid #ddd', display: 'flex'}}>
						<div style={{width: '323px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}>{elem.label}</div>
						<div style={{width: '49px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}><div style={{textAlign: 'center'}}><Icon sort={elem.id} forPDF/></div></div>
						<div style={{width: '102px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{elem.a_1 + elem.a_2 + elem.a_3 + elem.a_4}</div>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}/>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}/>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}/>
						<div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px'}}/>
						<div style={{width: '90px', height: '21px', padding: '5px'}}/>
					</div>)}
					<div style={{display: 'flex'}}>
                        <div style={{width: '383px', height: '21px', borderRight: '1px solid #ddd', padding: '4px 5px', fontSize: '20px'}}>{'Итого '}<span style={{fontSize: '16px'}}>(без свободных и непригодных мест)</span></div>
                        <div style={{width: '102px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{tableData && tableData.reduce((result, item) => {
                            if (item.type === 'free' || item.type === 'hatching') return result;
                            else return result + item.a_1 + item.a_2 + item.a_3 + item.a_4;
                        }, 0)}</div>
                        <div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{tableData && tableData.reduce((result, item) => {
                            if (item.type === 'free' || item.type === 'hatching') return result;
                            else return result + item.a_1;
                        }, 0)}</div>
                        <div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{tableData && tableData.reduce((result, item) => {
                            if (item.type === 'free' || item.type === 'hatching') return result;
                            else return result + item.a_2;
                        }, 0)}</div>
                        <div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{tableData && tableData.reduce((result, item) => {
                            if (item.type === 'free' || item.type === 'hatching') return result;
                            else return result + item.a_3;
                        }, 0)}</div>
                        <div style={{width: '92px', height: '21px', borderRight: '1px solid #ddd', padding: '5px', textAlign: 'center'}}>{tableData && tableData.reduce((result, item) => {
                            if (item.type === 'free' || item.type === 'hatching') return result;
                            else return result + item.a_4;
                        }, 0)}</div>
                        <div style={{width: '90px', height: '21px', padding: '5px', textAlign: 'center'}}>{tableData && tableData.reduce((result, item) => {
                            if (item.type === 'free' || item.type === 'hatching') return result;
                            else return result + item.a_0;
                        }, 0)}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};