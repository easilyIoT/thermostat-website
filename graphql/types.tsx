import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateTaskInput = {
  name: Scalars['String'];
  start: TimeInput;
  done: TimeInput;
  daily: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  login: TokenResponse;
  register: User;
  createTask: Task;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateTaskArgs = {
  CreateTaskDto: CreateTaskInput;
};

export type Query = {
   __typename?: 'Query';
  me: User;
  getUsers: Array<User>;
  getUser: User;
  tasks: Array<Task>;
  task: Task;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SaveGroupDto = {
  group: Scalars['String'];
};

export type Task = {
   __typename?: 'Task';
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: Scalars['String'];
  start: Time;
  done: Time;
  daily: Scalars['Boolean'];
};

export type Time = {
   __typename?: 'Time';
  hour: Scalars['Int'];
  minute: Scalars['Int'];
};

export type TimeInput = {
  hour: Scalars['Int'];
  minute: Scalars['Int'];
};

export type TokenResponse = {
   __typename?: 'TokenResponse';
  token: Scalars['String'];
};

export type UpdateTaskInput = {
  name: Scalars['String'];
  start: TimeInput;
  done: TimeInput;
  daily: Scalars['Boolean'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  password: Scalars['String'];
  refresh_token?: Maybe<Scalars['String']>;
  access_token?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
};

export type TaskFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'name' | 'owner' | 'daily'>
  & { start: (
    { __typename?: 'Time' }
    & Pick<Time, 'hour' | 'minute'>
  ), done: (
    { __typename?: 'Time' }
    & Pick<Time, 'hour' | 'minute'>
  ) }
);

export type TokenFragment = (
  { __typename?: 'TokenResponse' }
  & Pick<TokenResponse, 'token'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'access_token' | 'group' | 'password'>
);

export type CreateTaskMutationVariables = {
  name: Scalars['String'];
  start: TimeInput;
  done: TimeInput;
  daily: Scalars['Boolean'];
};


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & TaskFragment
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & UserFragment
  ) }
);

export type TasksQueryVariables = {};


export type TasksQuery = (
  { __typename?: 'Query' }
  & { tasks: Array<(
    { __typename?: 'Task' }
    & TaskFragment
  )> }
);

export const TaskFragmentDoc = gql`
    fragment Task on Task {
  id
  name
  start {
    hour
    minute
  }
  done {
    hour
    minute
  }
  owner
  daily
}
    `;
export const TokenFragmentDoc = gql`
    fragment Token on TokenResponse {
  token
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  access_token
  group
  password
}
    `;
export const CreateTaskDocument = gql`
    mutation createTask($name: String!, $start: TimeInput!, $done: TimeInput!, $daily: Boolean!) {
  createTask(CreateTaskDto: {name: $name, start: $start, done: $done, daily: $daily}) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      name: // value for 'name'
 *      start: // value for 'start'
 *      done: // value for 'done'
 *      daily: // value for 'daily'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const TasksDocument = gql`
    query Tasks {
  tasks {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useTasksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TasksQuery, TasksQueryVariables>) {
        return ApolloReactHooks.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, baseOptions);
      }
export function useTasksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, baseOptions);
        }
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksQueryResult = ApolloReactCommon.QueryResult<TasksQuery, TasksQueryVariables>;