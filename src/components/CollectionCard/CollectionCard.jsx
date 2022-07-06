import React from 'react';
import PropTypes from 'prop-types';
import styles from './CollectionCard.module.css';

function CollectionCard({
  title, type, upvotes, downvotes, user,
}) {
  return (
    <div className={styles.container}>
      <button type="button">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13L1 7L7 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={styles.card}>

        <h3 className={styles.title}>{title}</h3>
        <div className={styles.type}>{type}</div>
        <div className={styles.dataRow}>
          <div className={styles.data}>
            <svg className={styles.icon} width="24" height="24" viewBox="-3 -4 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(0.7)">
                <path d="M17 2H19.67C20.236 1.98999 20.7859 2.18813 21.2154 2.55682C21.645 2.9255 21.9242 3.43906 22 4V11C21.9242 11.5609 21.645 12.0745 21.2154 12.4432C20.7859 12.8119 20.236 13.01 19.67 13H17M10 15V19C10 19.7956 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72003C5.2377 1.99455 4.76965 2.16359 4.40212 2.47599C4.0346 2.78839 3.79235 3.22309 3.72003 3.7L2.34003 12.7C2.29652 12.9866 2.31586 13.2793 2.39669 13.5577C2.47753 13.8362 2.61793 14.0937 2.80817 14.3125C2.99842 14.5313 3.23395 14.7061 3.49846 14.8248C3.76297 14.9435 4.05012 15.0033 4.34003 15H10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            <span className={styles.downvotes}>{downvotes}</span>
          </div>

          <div className={styles.data}>
            <svg className={styles.icon} width="24" height="24" viewBox="-4 -2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(0.7)">
                <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            <span className={styles.upvotes}>{upvotes}</span>
          </div>

          <div className={styles.data}>
            <svg className={styles.icon} width="24" height="24" viewBox="-4 -3 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(0.7)" clipPath="url(#clip0_919_4218)">
                <path d="M16 16L12 12L8 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 12V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5798 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6901 21.9434 10.7355 21.0666 10.0534C20.1898 9.37138 19.1108 9.00073 18 9H16.74C16.4373 7.82924 15.8731 6.74233 15.0899 5.82099C14.3067 4.89965 13.3248 4.16785 12.2181 3.68061C11.1113 3.19336 9.90851 2.96336 8.70008 3.00788C7.49164 3.05241 6.30903 3.3703 5.24114 3.93766C4.17325 4.50503 3.24787 5.3071 2.53458 6.28358C1.82129 7.26006 1.33865 8.38554 1.12294 9.57539C0.90723 10.7653 0.964065 11.9885 1.28917 13.1533C1.61428 14.318 2.1992 15.3939 2.99996 16.3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 16L12 12L8 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            <h3 className={styles.user}>{user}</h3>
          </div>
        </div>

      </div>
      <div className={styles.addButtons}>
        <button type="button">
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.83337V13.1667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.33334 8.5H12.6667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button">
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_114_1208)">
              <path d="M7.00001 12.6666C9.3012 12.6666 11.1667 10.8012 11.1667 8.49998C11.1667 6.19879 9.3012 4.33331 7.00001 4.33331C4.69882 4.33331 2.83334 6.19879 2.83334 8.49998C2.83334 10.8012 4.69882 12.6666 7.00001 12.6666Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

CollectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
};
export default CollectionCard;
