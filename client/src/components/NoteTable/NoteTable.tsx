import React, { FC } from 'react';
import { IContent } from '../../models/NoteContent';
import './NoteTable.scss';

interface props {
    item: IContent;
}

const NoteTable: FC<props> = ({ item }) => {
    return (
        <table key={item.type}>
            <thead>
                <tr>
                    {typeof item.content !== 'string' &&
                    !(item.content instanceof File)
                        ? item.content[0].map((field) => (
                              <th className="cell" key={field}>
                                  {field}
                              </th>
                          ))
                        : ''}
                </tr>
            </thead>
            <tbody>
                {typeof item.content !== 'string' &&
                !(item.content instanceof File)
                    ? item.content.slice(1).map((attr, i) => (
                          <tr key={attr[i]}>
                              {attr.map((mean, i) => (
                                  <td className="cell" key={i}>
                                      {mean}
                                  </td>
                              ))}
                          </tr>
                      ))
                    : ''}
            </tbody>
        </table>
    );
};

export default NoteTable;
