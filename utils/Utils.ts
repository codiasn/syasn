import lodash from "lodash";

export default {
  lodash,

  sleep(time = 500) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), time);
    });
  },

  share(text: string, title?: string, mimetype?: string) {
    // const share = navigator.share as (
    //   text: string,
    //   title?: string,
    //   mimetype?: string
    // ) => void;
    // share(text, title, mimetype);
  },

  formatCurrency(value: string | number) {
    let result = "";
    const amount = value
      .toString()
      .replace(/\s/g, "")
      .replace(",", ".")
      .replace(/[^\d.]/g, "");

    if (amount) {
      const p = amount.split(".");
      const p1 = p[0].split("").reverse();
      const p2 = p[1];

      let step = 0;
      const r1: string[] = [];

      p1.forEach((p) => {
        step++;
        r1.push(p);
        if (step === 3) {
          step = 0;
          r1.push(" ");
        }
      });

      result = r1.reverse().join("").trim();

      if (amount.includes(".")) {
        result += ",";
        if (p2) result += ` ${p2.slice(0, 6)}`;
      }
    }

    return result;
  },

  getCountry() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timezone === "" || !timezone) {
      return null;
    }

    const _country = Data.timezones[timezone as "Africa/Abidjan"].c[0];
    const country = Data.countries[_country as "SN"];

    return country;
  },

  Number: {
    format: {
      time(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${
          remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
      },

      duration(duration: number) {
        const hours = Math.floor(duration / 3600);
        const remainingSeconds = duration % 3600;
        const minutes = Math.floor(remainingSeconds / 60);

        if (hours < 1) {
          if (minutes < 1) return `${duration} sec`;
          return `${minutes} min`;
        }
        return `${hours} h ${minutes} min`;
      },

      distance(distance: number) {
        let distanceFormatee: string;

        if (distance >= 1000) {
          var distanceEnKilometres = distance / 1000;
          distanceFormatee = distanceEnKilometres.toFixed(2) + " km";
        } else {
          distanceFormatee = distance.toFixed(0) + " m";
        }

        return distanceFormatee;
      },

      card(cardNumber: string) {
        // Supprimer les espaces et les tirets s'ils existent
        cardNumber = cardNumber.replace(/[\s-]/g, "");

        // Définir le format de la carte (généralement xxxx-xxxx-xxxx-xxxx)
        const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");

        return formattedCardNumber;
      },
    },
  },

  Toast: {
    push(message: any) {
      message.key = Math.random().toString();
      dispatchEvent(new CustomEvent("toast:push", { detail: message }));
    },
  },
};
