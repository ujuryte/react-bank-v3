import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const url = 'http://localhost:3003/clients';

export default function useData() {

    const [data, setData] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setData(res.data.clients.map((c) => ({ ...c, pid: null})));
      })
  }, []);


  useEffect(() => {
    if (null === createData) {
      return
    }
    const promiseID = uuidv4();

    setData(c => [...c, {
      ...createData,
      pid: promiseID
    }]);



    axios.post(url, { client: createData, promiseID })
      .then(res => {
        setData(c => c.map(c => c.pid === res.data.promiseID ? { ...c, pid: null, id: res.data.id } : { ...c }))
      });
  }, [createData])

  useEffect(() => {
    if (null === editData) {
      return;
    }
    const promiseID = uuidv4();
    setData(c => c.map(c => c.id === editData.id ? { ...c, ...editData, pid: promiseID } : { ...c }))



    axios.put(url + '/' + editData.id, { client: editData, promiseID })
      .then(res => {
        setData(c => c.map(c => c.pid === res.data.promiseID ? { ...c, pid: null } : { ...c }))
      });
  }, [editData]);

  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    setData(c => c.filter(c => c.id !== deleteData.id))


    axios.delete(url + '/' + deleteData.id)
      .then(res => {
      })
  }, [deleteData])

  return [data, setCreateData, setEditData, setDeleteData]
}