// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as t from 'io-ts';
import * as D from 'io-ts/Decoder';
import { isRight } from 'fp-ts/Either';

type ApiMentor = t.TypeOf<typeof mentorType>;

const mentorType = t.strict({
  user_id: t.string,
  id: t.string,
  birth_year: t.number,
  display_name: t.string,
  story: t.string,
  region: t.string,
  skills: t.array(t.string),
  languages: t.array(t.string),
  is_vacationing: t.boolean,
  status_message: t.string,
  gender: t.string,
  communication_channels: t.array(t.string),
});

const apiMentorType = D.struct({
  user_id: D.string,
  id: D.string,
  birth_year: D.number,
  display_name: D.string,
  story: D.string,
  region: D.string,
  skills: D.array(D.string),
  languages: D.array(D.string),
  is_vacationing: D.boolean,
  status_message: D.string,
  gender: D.string,
  communication_channels: D.array(D.string),
});

const mentorListType = t.strict({ resources: t.array(mentorType) });

export type Mentor = ReturnType<typeof toMentor>;

const toMentor = ({
  birth_year,
  display_name,
  user_id,
  id,
  ...props
}: ApiMentor) => ({
  ...props,
  mentorId: id,
  buddyId: user_id,
  age: new Date().getFullYear() - birth_year,
  name: display_name,
});

export type Mentors = Record<string, Mentor>;

const fromMentorList = ({ resources }: t.TypeOf<typeof mentorListType>) =>
  resources.reduce((acc: Mentors, apiMentor) => {
    const result = apiMentorType.decode(apiMentor);
    if (isRight(result)) {
      const mentor: Mentor = toMentor(apiMentor);

      return { ...acc, [mentor.buddyId]: mentor };
    }
    console.log('ERROR');
    return { ...acc };
  }, {});

// Define a service using a base URL and expected endpoints
export const mentorApi = createApi({
  reducerPath: 'mentors',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.ylitse.fi/api/' }),
  endpoints: builder => ({
    getMentors: builder.query<Mentors, void>({
      query: () => 'mentors',
      transformResponse: ({ resources }: t.TypeOf<typeof mentorListType>) =>
        fromMentorList({ resources }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMentorsQuery } = mentorApi;
