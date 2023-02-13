import { Color, palette } from '../variables';

type Props = {
  color: Color;
  isLarge?: boolean;
};

export const Profile: React.FC<Props> = ({ color, isLarge = false }) =>
  isLarge ? (
    <svg
      width="84"
      height="84"
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="81.8"
        height="81.0019"
        rx="40.501"
        stroke={palette[color]}
        strokeWidth="2"
      />
      <g clipPath="url(#clip0_1269_3197)">
        <path
          d="M42.3659 40.9606C47.4674 40.9606 51.6064 36.8216 51.6064 31.7201C51.6064 26.6186 47.4674 22.4797 42.3659 22.4797C37.2644 22.4797 33.1255 26.6186 33.1255 31.7201C33.1255 36.8216 37.2644 40.9606 42.3659 40.9606ZM50.5797 43.014H47.0439C45.6193 43.6685 44.0344 44.0407 42.3659 44.0407C40.6975 44.0407 39.1189 43.6685 37.688 43.014H34.1522C29.6154 43.014 25.9385 46.6909 25.9385 51.2277V52.2545C25.9385 53.955 27.3181 55.3346 29.0186 55.3346H55.7132C57.4137 55.3346 58.7934 53.955 58.7934 52.2545V51.2277C58.7934 46.6909 55.1165 43.014 50.5797 43.014Z"
          fill={palette[color]}
        />
      </g>
      <defs>
        <clipPath id="clip0_1269_3197">
          <rect
            width="32.8549"
            height="32.8549"
            fill={palette[color]}
            transform="translate(25.9385 22.4797)"
          />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width="49"
      height="48"
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.5"
        y="1"
        width="46.4615"
        height="46"
        rx="23"
        stroke={palette[color]}
        strokeWidth="2"
      />
      <g clipPath="url(#clip0_1359_2947)">
        <path
          d="M25 23.6875C27.9502 23.6875 30.3438 21.2939 30.3438 18.3438C30.3438 15.3936 27.9502 13 25 13C22.0498 13 19.6562 15.3936 19.6562 18.3438C19.6562 21.2939 22.0498 23.6875 25 23.6875ZM29.75 24.875H27.7053C26.8814 25.2535 25.9648 25.4688 25 25.4688C24.0352 25.4688 23.1223 25.2535 22.2947 24.875H20.25C17.6264 24.875 15.5 27.0014 15.5 29.625V30.2188C15.5 31.2021 16.2979 32 17.2812 32H32.7188C33.7021 32 34.5 31.2021 34.5 30.2188V29.625C34.5 27.0014 32.3736 24.875 29.75 24.875Z"
          fill={palette[color]}
        />
      </g>
      <defs>
        <clipPath id="clip0_1359_2947">
          <rect
            width="19"
            height="19"
            fill={palette[color]}
            transform="translate(15.5 13)"
          />
        </clipPath>
      </defs>
    </svg>
  );
