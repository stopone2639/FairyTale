// ** 알림

import {useEffect, useState} from 'react';
import MyNotification from '@/components/individual/MyNotification';
import '@individual/Notifications.scss';
import {item} from '@individual/notification';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {db} from '@apis/notifications/firebaseConfig';
import {currentUser} from '@common/commonFunc';

function Notifications() {
  const [newItems, setNewItems] = useState<item[]>([]);
  const deleteEach = (index: number) => {
    signInWithEmailAndPassword(
      auth,
      process.env.REACT_APP_ADMIN_EMAIL || '',
      process.env.REACT_APP_ADMIN_PASSWORD || '',
    ) //정보를 토대로 로그인
      .then(async () => {
        try {
          deleteDoc(doc(db, 'notification', String(newItems[index].id)));
          setNewItems(() => newItems.filter((element, i) => i !== index));
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const deleteAll = async () => {
    signInWithEmailAndPassword(
      auth,
      process.env.REACT_APP_ADMIN_EMAIL || '',
      process.env.REACT_APP_ADMIN_PASSWORD || '',
    ) //정보를 토대로 로그인
      .then(async () => {
        try {
          const deletedItems = [...newItems];
          setNewItems(() => []);
          deletedItems.forEach(element => {
            deleteDoc(doc(db, 'notification', String(element.id)));
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const userId = currentUser();

  const auth = getAuth();
  const readData = async (userId: number) => {
    console.log(process.env.REACT_APP_ADMIN_EMAIL);
    console.log(process.env.REACT_APP_ADMIN_PASSWORD);
    signInWithEmailAndPassword(
      auth,
      process.env.REACT_APP_ADMIN_EMAIL || '',
      process.env.REACT_APP_ADMIN_PASSWORD || '',
    ) //정보를 토대로 로그인
      .then(async () => {
        try {
          const q = query(
            collection(db, 'notification'),
            where('userId', '==', userId),
          );
          const querySnapshot = await getDocs(q);
          const newData: any = [];
          querySnapshot.forEach(doc => {
            newData.push({id: String(doc.id), ...doc.data()});
          });
          setNewItems(() => newData);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    readData(userId);
  }, []);

  return (
    <div className="notifications">
      <p className="notifications-delete-all" onClick={deleteAll} draggable>
        전체 삭제
      </p>
      {newItems.length === 0 ? (
        <div className="notifications-empty">새로운 알림이 없습니다.</div>
      ) : (
        <div className="notifications-list">
          {newItems.map((item, index) => {
            return (
              <MyNotification
                item={item}
                key={item.id}
                deleteEach={deleteEach}
                index={index}
                dragFlag={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Notifications;