import moment from 'moment';

const currentYear = moment().get('year');

const getUTC = date => new Date(date).getTime();
const getTitleAsNumber = item => (
  parseInt(
    moment(item.title).format('YYYYMMDD'),
    10
  )
);

const sortingByTime = data => data.sort( // third step
  (i1, i2) => {
    const UTC1 = getUTC(i1.createdAt);
    const UTC2 = getUTC(i2.createdAt);

    return UTC1 < UTC2 ? 1 : UTC1 > UTC2 ? -1 : 0;
  }
);

const sectionsSorting = ( // second step
  data => data.sort(
    (i1, i2) => (getTitleAsNumber(i1) < getTitleAsNumber(i2) ? 1 : -1)
  )
);

const getSectionedData = data => ( // first step
  data
    .reduce(
      (accum, item) => {
        const date = moment(item.createdAt).format('DD MMMM YYYY');
        const dateYear = moment(date).get('year');

        const title = (
          currentYear !== dateYear ? moment(date).format('MMMM YYYY')
            : date
        );

        const currentSection = accum?.find(aItem => aItem.title === title);

        if (currentSection) {
          const accumCopy = accum;
          const currentIndex = accumCopy.findIndex(i => i === currentSection);
          const sectionData = [...accumCopy[currentIndex].data, item];

          accumCopy[currentIndex].data = sectionData;

          return accumCopy;
        }

        return [...accum, { title, data: [item] }];
      },
      []
    )
);

const sectioningDataByDate = data => {
  const sectionedData = getSectionedData(data);
  // section sorting
  const sortedByDays = sectionsSorting(sectionedData);
  // transactions sorting by time inside an each section
  const sortedByTime = sortedByDays.map(
    ({ title, data: sectionData }) => ({ title, data: sortingByTime(sectionData) })
  );

  return sortedByTime;
};

export default sectioningDataByDate;
