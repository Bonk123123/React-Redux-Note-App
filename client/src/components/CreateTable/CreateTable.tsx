import React, { FC } from 'react';
import './CreateTable.scss';
import Btn from '../Btn/Btn';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updateItem } from '../../redux/noteContentSlice/noteContentSlice';
import { IContent } from '../../models/NoteContent';

interface props {
    i: number;
    item?: IContent;
}

const CreateTable: FC<props> = ({ i, item }) => {
    const dispatch = useAppDispatch();
    const { content } = useAppSelector((state) => state.noteContent.note[i]);

    React.useEffect(() => {
        if (item) {
            dispatch(
                updateItem({
                    j: i,
                    content: {
                        type: 'table',
                        content: item.content,
                    },
                })
            );
        }
    }, [dispatch, i]);

    const handleChangeTableState = (
        i1: number,
        j1: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(
            updateItem({
                j: i,
                content: {
                    type: 'table',
                    content:
                        typeof content !== 'string' &&
                        !(content instanceof File)
                            ? content.map((item2, i2) => {
                                  return item2.map((item3, i3) => {
                                      if (i1 === i2 && j1 === i3) {
                                          return e.target.value;
                                      } else {
                                          return item3;
                                      }
                                  });
                              })
                            : [],
                },
            })
        );
    };

    const handleAddRaw = () => {
        dispatch(
            updateItem({
                j: i,
                content: {
                    type: 'table',
                    content:
                        typeof content !== 'string' &&
                        !(content instanceof File)
                            ? [...content, Array(content[0]?.length).fill('')]
                            : [],
                },
            })
        );
    };

    const handleAddColumn = () => {
        dispatch(
            updateItem({
                j: i,
                content: {
                    type: 'table',
                    content:
                        typeof content !== 'string' &&
                        !(content instanceof File)
                            ? content.map((item) => [...item, ''])
                            : [],
                },
            })
        );
    };

    const handleDeleteRaw = () => {
        dispatch(
            updateItem({
                j: i,
                content: {
                    type: 'table',
                    content:
                        typeof content !== 'string' &&
                        !(content instanceof File)
                            ? content.filter(
                                  (_, i1) => i1 !== content.length - 1
                              )
                            : [],
                },
            })
        );
    };

    const handleDeleteColumn = () => {
        dispatch(
            updateItem({
                j: i,
                content: {
                    type: 'table',
                    content:
                        typeof content !== 'string' &&
                        !(content instanceof File)
                            ? content.map((item) =>
                                  item.filter(
                                      (_, i1) => i1 !== content.length - 1
                                  )
                              )
                            : [],
                },
            })
        );
    };

    return (
        <div className="div-table">
            <div className="div-table-btn-down">
                <Btn
                    option={{ onClick: handleDeleteRaw }}
                    className="div-table-btn-down-plus"
                    name="-"
                />
                <Btn
                    option={{ onClick: handleAddRaw }}
                    className="div-table-btn-down-minus"
                    name="+"
                />
            </div>
            <div className="div-table-btn-right">
                <Btn
                    option={{ onClick: handleDeleteColumn }}
                    className="div-table-btn-right-plus"
                    name="-"
                />
                <Btn
                    option={{ onClick: handleAddColumn }}
                    className="div-table-btn-right-minus"
                    name="+"
                />
            </div>

            <table>
                <thead>
                    <tr>
                        {typeof content !== 'string' &&
                        !(content instanceof File)
                            ? content[0]?.map((_, i) => (
                                  <th className="cell">
                                      <input
                                          value={content[0][i]}
                                          onChange={(e) =>
                                              handleChangeTableState(0, i, e)
                                          }
                                      />
                                  </th>
                              ))
                            : 'error'}
                    </tr>
                </thead>
                <tbody>
                    {typeof content !== 'string' && !(content instanceof File)
                        ? content.slice(1).map((_, i) => (
                              <tr>
                                  {typeof content !== 'string'
                                      ? content[i].map((_, j) => (
                                            <td className="cell">
                                                <input
                                                    value={content[i + 1][j]}
                                                    onChange={(e) =>
                                                        handleChangeTableState(
                                                            i + 1,
                                                            j,
                                                            e
                                                        )
                                                    }
                                                />
                                            </td>
                                        ))
                                      : 'error'}
                              </tr>
                          ))
                        : 'error'}
                </tbody>
            </table>
        </div>
    );
};

export default CreateTable;
