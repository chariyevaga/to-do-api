const birlik = (n) => {
  let a = ['bir', 'iki', 'üç', 'dört', 'baş', 'alty', 'ýedi', 'sekiz', 'dokuz'];
  return a[n - 1] ? a[n - 1] : '';
};

const onluk = (n) => {
  let a = ['on', 'ýigrimi', 'otuz', 'kyrk', 'elli', 'altmyş', 'ýetmis', 'segsen', 'dogsan'];
  return a[n - 1] ? a[n - 1] : '';
};

const convertToWord = (n) => {
  const bolekler = ('' + n).split('').reverse();
  const words = [];
  for (i = 0; i < bolekler.length; i++) {
    switch (i) {
      case 0:
        words.push(birlik(bolekler[i]));
        break;
      case 1:
        words.push(onluk(bolekler[i]));
        break;
      case 2:
        words.push(birlik(bolekler[i]) + ' ýüz');
        break;
      case 3:
        words.push(birlik(bolekler[i]) + ' müň');
        break;
      case 4:
        words.push(onluk(bolekler[i]));
        break;
      case 5:
        words.push(birlik(bolekler[i]) + ' ýüz');
        break;

      case 6:
        words.push(birlik(bolekler[i]) + '  milion');
        break;
      case 7:
        words.push(onluk(bolekler[i]));
        break;
      case 8:
        words.push(birlik(bolekler[i]) + ' ýüz');
        break;
      case 9:
        words.push(birlik(bolekler[i]) + ' milýard');
        break;
      case 10:
        words.push(onluk(bolekler[i]));
        break;

      case 11:
        words.push(birlik(bolekler[i]) + ' ýüz');
        break;
      case 12:
        words.push(birlik(bolekler[i]) + ' trelýon');
        break;
      case 13:
        words.push(onluk(bolekler[i]));
        break;
      case 14:
        words.push(birlik(bolekler[i]) + ' ýüz');
        break;
      /*case 15:
        words.push(birlik(bolekler[i]) + ' trelýon');
        break;
      case 16:
        words.push(onluk(bolekler[i]));
        break;
      case 17:
        words.push(birlik(bolekler[i]) + ' ýüz');
        break;*/
    }
  }

  return words.reverse().join(' ');
};

total = 2345;

const giveMoney = (total) => {
  const type = [100, 50, 20, 10, 5, 2, 1];
  const payment = {};
  let sum = 0;
  for (i = 0; i < type.length; i++) {
    let galyndy = total - sum;
    if (galyndy <= 0) {
      break;
    }

    if (galyndy / type[i] >= 1) {
      payment[type[i]] = (galyndy - (galyndy % type[i])) / type[i];
      sum += payment[type[i]] * type[i];
    }
  }
  return payment;
};
console.log(giveMoney(388));
