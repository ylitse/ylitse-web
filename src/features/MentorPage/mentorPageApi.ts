// Need to use the React-specific entry point to import createApi
import { createSelector } from 'reselect';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as D from 'io-ts/Decoder';
import { validateAndTransformTo } from '@/utils/http';

type ApiMentor = D.TypeOf<typeof apiMentorType>;

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

const mentorListResponseType = D.struct({ resources: D.array(apiMentorType) });
type MentorsResponse = D.TypeOf<typeof mentorListResponseType>;

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

const toMentorRecord = ({ resources }: MentorsResponse) =>
  resources.reduce((acc: Mentors, apiMentor) => {
    const mentor: Mentor = toMentor(apiMentor);
    return { ...acc, [mentor.buddyId]: mentor };
  }, {});

// Define a service using a base URL and expected endpoints
export const mentorsApi = createApi({
  reducerPath: 'mentors',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.ylitse.fi/api/' }),
  endpoints: builder => ({
    getMentors: builder.query<Mentors, void>({
      query: () => 'mentors',
      transformResponse: (response: unknown) =>
        validateAndTransformTo(
          response,
          mentorListResponseType,
          { resources: [] },
          toMentorRecord,
        ),
    }),
  }),
});

const selectMentors = mentorsApi.endpoints.getMentors.select();

const mapSkills = (mentors: Mentors) => {
  return Object.values(mentors)
    .map(mentor => mentor.skills)
    .flat()
    .filter((item, index, self) => self.indexOf(item) === index) // remove duplicates
    .sort();
};
export const selectSkills = () =>
  createSelector(selectMentors, response => mapSkills(response.data ?? {}));

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMentorsQuery } = mentorsApi;
