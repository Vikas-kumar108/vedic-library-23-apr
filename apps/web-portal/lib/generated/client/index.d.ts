
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model LibraryNode
 * 
 */
export type LibraryNode = $Result.DefaultSelection<Prisma.$LibraryNodePayload>
/**
 * Model Verse
 * 
 */
export type Verse = $Result.DefaultSelection<Prisma.$VersePayload>
/**
 * Model Author
 * 
 */
export type Author = $Result.DefaultSelection<Prisma.$AuthorPayload>
/**
 * Model Translation
 * 
 */
export type Translation = $Result.DefaultSelection<Prisma.$TranslationPayload>
/**
 * Model Commentary
 * 
 */
export type Commentary = $Result.DefaultSelection<Prisma.$CommentaryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more LibraryNodes
 * const libraryNodes = await prisma.libraryNode.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more LibraryNodes
   * const libraryNodes = await prisma.libraryNode.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.libraryNode`: Exposes CRUD operations for the **LibraryNode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LibraryNodes
    * const libraryNodes = await prisma.libraryNode.findMany()
    * ```
    */
  get libraryNode(): Prisma.LibraryNodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verse`: Exposes CRUD operations for the **Verse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verses
    * const verses = await prisma.verse.findMany()
    * ```
    */
  get verse(): Prisma.VerseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.author`: Exposes CRUD operations for the **Author** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Authors
    * const authors = await prisma.author.findMany()
    * ```
    */
  get author(): Prisma.AuthorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.translation`: Exposes CRUD operations for the **Translation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Translations
    * const translations = await prisma.translation.findMany()
    * ```
    */
  get translation(): Prisma.TranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commentary`: Exposes CRUD operations for the **Commentary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Commentaries
    * const commentaries = await prisma.commentary.findMany()
    * ```
    */
  get commentary(): Prisma.CommentaryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.4.1
   * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    LibraryNode: 'LibraryNode',
    Verse: 'Verse',
    Author: 'Author',
    Translation: 'Translation',
    Commentary: 'Commentary'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "libraryNode" | "verse" | "author" | "translation" | "commentary"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      LibraryNode: {
        payload: Prisma.$LibraryNodePayload<ExtArgs>
        fields: Prisma.LibraryNodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LibraryNodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LibraryNodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload>
          }
          findFirst: {
            args: Prisma.LibraryNodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LibraryNodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload>
          }
          findMany: {
            args: Prisma.LibraryNodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload>[]
          }
          create: {
            args: Prisma.LibraryNodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload>
          }
          createMany: {
            args: Prisma.LibraryNodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LibraryNodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload>[]
          }
          delete: {
            args: Prisma.LibraryNodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload>
          }
          update: {
            args: Prisma.LibraryNodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload>
          }
          deleteMany: {
            args: Prisma.LibraryNodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LibraryNodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LibraryNodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload>[]
          }
          upsert: {
            args: Prisma.LibraryNodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LibraryNodePayload>
          }
          aggregate: {
            args: Prisma.LibraryNodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLibraryNode>
          }
          groupBy: {
            args: Prisma.LibraryNodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<LibraryNodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.LibraryNodeCountArgs<ExtArgs>
            result: $Utils.Optional<LibraryNodeCountAggregateOutputType> | number
          }
        }
      }
      Verse: {
        payload: Prisma.$VersePayload<ExtArgs>
        fields: Prisma.VerseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload>
          }
          findFirst: {
            args: Prisma.VerseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload>
          }
          findMany: {
            args: Prisma.VerseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload>[]
          }
          create: {
            args: Prisma.VerseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload>
          }
          createMany: {
            args: Prisma.VerseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload>[]
          }
          delete: {
            args: Prisma.VerseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload>
          }
          update: {
            args: Prisma.VerseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload>
          }
          deleteMany: {
            args: Prisma.VerseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload>[]
          }
          upsert: {
            args: Prisma.VerseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersePayload>
          }
          aggregate: {
            args: Prisma.VerseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerse>
          }
          groupBy: {
            args: Prisma.VerseGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerseGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerseCountArgs<ExtArgs>
            result: $Utils.Optional<VerseCountAggregateOutputType> | number
          }
        }
      }
      Author: {
        payload: Prisma.$AuthorPayload<ExtArgs>
        fields: Prisma.AuthorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          findFirst: {
            args: Prisma.AuthorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          findMany: {
            args: Prisma.AuthorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>[]
          }
          create: {
            args: Prisma.AuthorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          createMany: {
            args: Prisma.AuthorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>[]
          }
          delete: {
            args: Prisma.AuthorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          update: {
            args: Prisma.AuthorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          deleteMany: {
            args: Prisma.AuthorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>[]
          }
          upsert: {
            args: Prisma.AuthorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          aggregate: {
            args: Prisma.AuthorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthor>
          }
          groupBy: {
            args: Prisma.AuthorGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthorGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthorCountArgs<ExtArgs>
            result: $Utils.Optional<AuthorCountAggregateOutputType> | number
          }
        }
      }
      Translation: {
        payload: Prisma.$TranslationPayload<ExtArgs>
        fields: Prisma.TranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload>
          }
          findFirst: {
            args: Prisma.TranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload>
          }
          findMany: {
            args: Prisma.TranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload>[]
          }
          create: {
            args: Prisma.TranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload>
          }
          createMany: {
            args: Prisma.TranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload>[]
          }
          delete: {
            args: Prisma.TranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload>
          }
          update: {
            args: Prisma.TranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload>
          }
          deleteMany: {
            args: Prisma.TranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload>[]
          }
          upsert: {
            args: Prisma.TranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranslationPayload>
          }
          aggregate: {
            args: Prisma.TranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTranslation>
          }
          groupBy: {
            args: Prisma.TranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<TranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.TranslationCountArgs<ExtArgs>
            result: $Utils.Optional<TranslationCountAggregateOutputType> | number
          }
        }
      }
      Commentary: {
        payload: Prisma.$CommentaryPayload<ExtArgs>
        fields: Prisma.CommentaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          findFirst: {
            args: Prisma.CommentaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          findMany: {
            args: Prisma.CommentaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>[]
          }
          create: {
            args: Prisma.CommentaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          createMany: {
            args: Prisma.CommentaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>[]
          }
          delete: {
            args: Prisma.CommentaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          update: {
            args: Prisma.CommentaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          deleteMany: {
            args: Prisma.CommentaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>[]
          }
          upsert: {
            args: Prisma.CommentaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          aggregate: {
            args: Prisma.CommentaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommentary>
          }
          groupBy: {
            args: Prisma.CommentaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentaryCountArgs<ExtArgs>
            result: $Utils.Optional<CommentaryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    libraryNode?: LibraryNodeOmit
    verse?: VerseOmit
    author?: AuthorOmit
    translation?: TranslationOmit
    commentary?: CommentaryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LibraryNodeCountOutputType
   */

  export type LibraryNodeCountOutputType = {
    children: number
  }

  export type LibraryNodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | LibraryNodeCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * LibraryNodeCountOutputType without action
   */
  export type LibraryNodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNodeCountOutputType
     */
    select?: LibraryNodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LibraryNodeCountOutputType without action
   */
  export type LibraryNodeCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LibraryNodeWhereInput
  }


  /**
   * Count Type VerseCountOutputType
   */

  export type VerseCountOutputType = {
    commentaries: number
    translations: number
  }

  export type VerseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentaries?: boolean | VerseCountOutputTypeCountCommentariesArgs
    translations?: boolean | VerseCountOutputTypeCountTranslationsArgs
  }

  // Custom InputTypes
  /**
   * VerseCountOutputType without action
   */
  export type VerseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerseCountOutputType
     */
    select?: VerseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VerseCountOutputType without action
   */
  export type VerseCountOutputTypeCountCommentariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentaryWhereInput
  }

  /**
   * VerseCountOutputType without action
   */
  export type VerseCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TranslationWhereInput
  }


  /**
   * Count Type AuthorCountOutputType
   */

  export type AuthorCountOutputType = {
    translations: number
    commentaries: number
  }

  export type AuthorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | AuthorCountOutputTypeCountTranslationsArgs
    commentaries?: boolean | AuthorCountOutputTypeCountCommentariesArgs
  }

  // Custom InputTypes
  /**
   * AuthorCountOutputType without action
   */
  export type AuthorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorCountOutputType
     */
    select?: AuthorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AuthorCountOutputType without action
   */
  export type AuthorCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TranslationWhereInput
  }

  /**
   * AuthorCountOutputType without action
   */
  export type AuthorCountOutputTypeCountCommentariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentaryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model LibraryNode
   */

  export type AggregateLibraryNode = {
    _count: LibraryNodeCountAggregateOutputType | null
    _avg: LibraryNodeAvgAggregateOutputType | null
    _sum: LibraryNodeSumAggregateOutputType | null
    _min: LibraryNodeMinAggregateOutputType | null
    _max: LibraryNodeMaxAggregateOutputType | null
  }

  export type LibraryNodeAvgAggregateOutputType = {
    order: number | null
    verseCount: number | null
  }

  export type LibraryNodeSumAggregateOutputType = {
    order: number | null
    verseCount: number | null
  }

  export type LibraryNodeMinAggregateOutputType = {
    id: string | null
    parentId: string | null
    path: string | null
    name: string | null
    sanskrit: string | null
    type: string | null
    order: number | null
    verseCount: number | null
  }

  export type LibraryNodeMaxAggregateOutputType = {
    id: string | null
    parentId: string | null
    path: string | null
    name: string | null
    sanskrit: string | null
    type: string | null
    order: number | null
    verseCount: number | null
  }

  export type LibraryNodeCountAggregateOutputType = {
    id: number
    parentId: number
    path: number
    name: number
    sanskrit: number
    type: number
    order: number
    verseCount: number
    structure: number
    meta: number
    _all: number
  }


  export type LibraryNodeAvgAggregateInputType = {
    order?: true
    verseCount?: true
  }

  export type LibraryNodeSumAggregateInputType = {
    order?: true
    verseCount?: true
  }

  export type LibraryNodeMinAggregateInputType = {
    id?: true
    parentId?: true
    path?: true
    name?: true
    sanskrit?: true
    type?: true
    order?: true
    verseCount?: true
  }

  export type LibraryNodeMaxAggregateInputType = {
    id?: true
    parentId?: true
    path?: true
    name?: true
    sanskrit?: true
    type?: true
    order?: true
    verseCount?: true
  }

  export type LibraryNodeCountAggregateInputType = {
    id?: true
    parentId?: true
    path?: true
    name?: true
    sanskrit?: true
    type?: true
    order?: true
    verseCount?: true
    structure?: true
    meta?: true
    _all?: true
  }

  export type LibraryNodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LibraryNode to aggregate.
     */
    where?: LibraryNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LibraryNodes to fetch.
     */
    orderBy?: LibraryNodeOrderByWithRelationInput | LibraryNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LibraryNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LibraryNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LibraryNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LibraryNodes
    **/
    _count?: true | LibraryNodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LibraryNodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LibraryNodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LibraryNodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LibraryNodeMaxAggregateInputType
  }

  export type GetLibraryNodeAggregateType<T extends LibraryNodeAggregateArgs> = {
        [P in keyof T & keyof AggregateLibraryNode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLibraryNode[P]>
      : GetScalarType<T[P], AggregateLibraryNode[P]>
  }




  export type LibraryNodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LibraryNodeWhereInput
    orderBy?: LibraryNodeOrderByWithAggregationInput | LibraryNodeOrderByWithAggregationInput[]
    by: LibraryNodeScalarFieldEnum[] | LibraryNodeScalarFieldEnum
    having?: LibraryNodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LibraryNodeCountAggregateInputType | true
    _avg?: LibraryNodeAvgAggregateInputType
    _sum?: LibraryNodeSumAggregateInputType
    _min?: LibraryNodeMinAggregateInputType
    _max?: LibraryNodeMaxAggregateInputType
  }

  export type LibraryNodeGroupByOutputType = {
    id: string
    parentId: string | null
    path: string | null
    name: string
    sanskrit: string | null
    type: string
    order: number
    verseCount: number | null
    structure: JsonValue | null
    meta: JsonValue | null
    _count: LibraryNodeCountAggregateOutputType | null
    _avg: LibraryNodeAvgAggregateOutputType | null
    _sum: LibraryNodeSumAggregateOutputType | null
    _min: LibraryNodeMinAggregateOutputType | null
    _max: LibraryNodeMaxAggregateOutputType | null
  }

  type GetLibraryNodeGroupByPayload<T extends LibraryNodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LibraryNodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LibraryNodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LibraryNodeGroupByOutputType[P]>
            : GetScalarType<T[P], LibraryNodeGroupByOutputType[P]>
        }
      >
    >


  export type LibraryNodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parentId?: boolean
    path?: boolean
    name?: boolean
    sanskrit?: boolean
    type?: boolean
    order?: boolean
    verseCount?: boolean
    structure?: boolean
    meta?: boolean
    parent?: boolean | LibraryNode$parentArgs<ExtArgs>
    children?: boolean | LibraryNode$childrenArgs<ExtArgs>
    _count?: boolean | LibraryNodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["libraryNode"]>

  export type LibraryNodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parentId?: boolean
    path?: boolean
    name?: boolean
    sanskrit?: boolean
    type?: boolean
    order?: boolean
    verseCount?: boolean
    structure?: boolean
    meta?: boolean
    parent?: boolean | LibraryNode$parentArgs<ExtArgs>
  }, ExtArgs["result"]["libraryNode"]>

  export type LibraryNodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parentId?: boolean
    path?: boolean
    name?: boolean
    sanskrit?: boolean
    type?: boolean
    order?: boolean
    verseCount?: boolean
    structure?: boolean
    meta?: boolean
    parent?: boolean | LibraryNode$parentArgs<ExtArgs>
  }, ExtArgs["result"]["libraryNode"]>

  export type LibraryNodeSelectScalar = {
    id?: boolean
    parentId?: boolean
    path?: boolean
    name?: boolean
    sanskrit?: boolean
    type?: boolean
    order?: boolean
    verseCount?: boolean
    structure?: boolean
    meta?: boolean
  }

  export type LibraryNodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "parentId" | "path" | "name" | "sanskrit" | "type" | "order" | "verseCount" | "structure" | "meta", ExtArgs["result"]["libraryNode"]>
  export type LibraryNodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | LibraryNode$parentArgs<ExtArgs>
    children?: boolean | LibraryNode$childrenArgs<ExtArgs>
    _count?: boolean | LibraryNodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LibraryNodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | LibraryNode$parentArgs<ExtArgs>
  }
  export type LibraryNodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | LibraryNode$parentArgs<ExtArgs>
  }

  export type $LibraryNodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LibraryNode"
    objects: {
      parent: Prisma.$LibraryNodePayload<ExtArgs> | null
      children: Prisma.$LibraryNodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      parentId: string | null
      path: string | null
      name: string
      sanskrit: string | null
      type: string
      order: number
      verseCount: number | null
      structure: Prisma.JsonValue | null
      meta: Prisma.JsonValue | null
    }, ExtArgs["result"]["libraryNode"]>
    composites: {}
  }

  type LibraryNodeGetPayload<S extends boolean | null | undefined | LibraryNodeDefaultArgs> = $Result.GetResult<Prisma.$LibraryNodePayload, S>

  type LibraryNodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LibraryNodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LibraryNodeCountAggregateInputType | true
    }

  export interface LibraryNodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LibraryNode'], meta: { name: 'LibraryNode' } }
    /**
     * Find zero or one LibraryNode that matches the filter.
     * @param {LibraryNodeFindUniqueArgs} args - Arguments to find a LibraryNode
     * @example
     * // Get one LibraryNode
     * const libraryNode = await prisma.libraryNode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LibraryNodeFindUniqueArgs>(args: SelectSubset<T, LibraryNodeFindUniqueArgs<ExtArgs>>): Prisma__LibraryNodeClient<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one LibraryNode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LibraryNodeFindUniqueOrThrowArgs} args - Arguments to find a LibraryNode
     * @example
     * // Get one LibraryNode
     * const libraryNode = await prisma.libraryNode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LibraryNodeFindUniqueOrThrowArgs>(args: SelectSubset<T, LibraryNodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LibraryNodeClient<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first LibraryNode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LibraryNodeFindFirstArgs} args - Arguments to find a LibraryNode
     * @example
     * // Get one LibraryNode
     * const libraryNode = await prisma.libraryNode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LibraryNodeFindFirstArgs>(args?: SelectSubset<T, LibraryNodeFindFirstArgs<ExtArgs>>): Prisma__LibraryNodeClient<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first LibraryNode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LibraryNodeFindFirstOrThrowArgs} args - Arguments to find a LibraryNode
     * @example
     * // Get one LibraryNode
     * const libraryNode = await prisma.libraryNode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LibraryNodeFindFirstOrThrowArgs>(args?: SelectSubset<T, LibraryNodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__LibraryNodeClient<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more LibraryNodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LibraryNodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LibraryNodes
     * const libraryNodes = await prisma.libraryNode.findMany()
     * 
     * // Get first 10 LibraryNodes
     * const libraryNodes = await prisma.libraryNode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const libraryNodeWithIdOnly = await prisma.libraryNode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LibraryNodeFindManyArgs>(args?: SelectSubset<T, LibraryNodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a LibraryNode.
     * @param {LibraryNodeCreateArgs} args - Arguments to create a LibraryNode.
     * @example
     * // Create one LibraryNode
     * const LibraryNode = await prisma.libraryNode.create({
     *   data: {
     *     // ... data to create a LibraryNode
     *   }
     * })
     * 
     */
    create<T extends LibraryNodeCreateArgs>(args: SelectSubset<T, LibraryNodeCreateArgs<ExtArgs>>): Prisma__LibraryNodeClient<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many LibraryNodes.
     * @param {LibraryNodeCreateManyArgs} args - Arguments to create many LibraryNodes.
     * @example
     * // Create many LibraryNodes
     * const libraryNode = await prisma.libraryNode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LibraryNodeCreateManyArgs>(args?: SelectSubset<T, LibraryNodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LibraryNodes and returns the data saved in the database.
     * @param {LibraryNodeCreateManyAndReturnArgs} args - Arguments to create many LibraryNodes.
     * @example
     * // Create many LibraryNodes
     * const libraryNode = await prisma.libraryNode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LibraryNodes and only return the `id`
     * const libraryNodeWithIdOnly = await prisma.libraryNode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LibraryNodeCreateManyAndReturnArgs>(args?: SelectSubset<T, LibraryNodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a LibraryNode.
     * @param {LibraryNodeDeleteArgs} args - Arguments to delete one LibraryNode.
     * @example
     * // Delete one LibraryNode
     * const LibraryNode = await prisma.libraryNode.delete({
     *   where: {
     *     // ... filter to delete one LibraryNode
     *   }
     * })
     * 
     */
    delete<T extends LibraryNodeDeleteArgs>(args: SelectSubset<T, LibraryNodeDeleteArgs<ExtArgs>>): Prisma__LibraryNodeClient<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one LibraryNode.
     * @param {LibraryNodeUpdateArgs} args - Arguments to update one LibraryNode.
     * @example
     * // Update one LibraryNode
     * const libraryNode = await prisma.libraryNode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LibraryNodeUpdateArgs>(args: SelectSubset<T, LibraryNodeUpdateArgs<ExtArgs>>): Prisma__LibraryNodeClient<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more LibraryNodes.
     * @param {LibraryNodeDeleteManyArgs} args - Arguments to filter LibraryNodes to delete.
     * @example
     * // Delete a few LibraryNodes
     * const { count } = await prisma.libraryNode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LibraryNodeDeleteManyArgs>(args?: SelectSubset<T, LibraryNodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LibraryNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LibraryNodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LibraryNodes
     * const libraryNode = await prisma.libraryNode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LibraryNodeUpdateManyArgs>(args: SelectSubset<T, LibraryNodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LibraryNodes and returns the data updated in the database.
     * @param {LibraryNodeUpdateManyAndReturnArgs} args - Arguments to update many LibraryNodes.
     * @example
     * // Update many LibraryNodes
     * const libraryNode = await prisma.libraryNode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LibraryNodes and only return the `id`
     * const libraryNodeWithIdOnly = await prisma.libraryNode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LibraryNodeUpdateManyAndReturnArgs>(args: SelectSubset<T, LibraryNodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one LibraryNode.
     * @param {LibraryNodeUpsertArgs} args - Arguments to update or create a LibraryNode.
     * @example
     * // Update or create a LibraryNode
     * const libraryNode = await prisma.libraryNode.upsert({
     *   create: {
     *     // ... data to create a LibraryNode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LibraryNode we want to update
     *   }
     * })
     */
    upsert<T extends LibraryNodeUpsertArgs>(args: SelectSubset<T, LibraryNodeUpsertArgs<ExtArgs>>): Prisma__LibraryNodeClient<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of LibraryNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LibraryNodeCountArgs} args - Arguments to filter LibraryNodes to count.
     * @example
     * // Count the number of LibraryNodes
     * const count = await prisma.libraryNode.count({
     *   where: {
     *     // ... the filter for the LibraryNodes we want to count
     *   }
     * })
    **/
    count<T extends LibraryNodeCountArgs>(
      args?: Subset<T, LibraryNodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LibraryNodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LibraryNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LibraryNodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LibraryNodeAggregateArgs>(args: Subset<T, LibraryNodeAggregateArgs>): Prisma.PrismaPromise<GetLibraryNodeAggregateType<T>>

    /**
     * Group by LibraryNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LibraryNodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LibraryNodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LibraryNodeGroupByArgs['orderBy'] }
        : { orderBy?: LibraryNodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LibraryNodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLibraryNodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LibraryNode model
   */
  readonly fields: LibraryNodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LibraryNode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LibraryNodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends LibraryNode$parentArgs<ExtArgs> = {}>(args?: Subset<T, LibraryNode$parentArgs<ExtArgs>>): Prisma__LibraryNodeClient<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    children<T extends LibraryNode$childrenArgs<ExtArgs> = {}>(args?: Subset<T, LibraryNode$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LibraryNodePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LibraryNode model
   */ 
  interface LibraryNodeFieldRefs {
    readonly id: FieldRef<"LibraryNode", 'String'>
    readonly parentId: FieldRef<"LibraryNode", 'String'>
    readonly path: FieldRef<"LibraryNode", 'String'>
    readonly name: FieldRef<"LibraryNode", 'String'>
    readonly sanskrit: FieldRef<"LibraryNode", 'String'>
    readonly type: FieldRef<"LibraryNode", 'String'>
    readonly order: FieldRef<"LibraryNode", 'Int'>
    readonly verseCount: FieldRef<"LibraryNode", 'Int'>
    readonly structure: FieldRef<"LibraryNode", 'Json'>
    readonly meta: FieldRef<"LibraryNode", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * LibraryNode findUnique
   */
  export type LibraryNodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    /**
     * Filter, which LibraryNode to fetch.
     */
    where: LibraryNodeWhereUniqueInput
  }

  /**
   * LibraryNode findUniqueOrThrow
   */
  export type LibraryNodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    /**
     * Filter, which LibraryNode to fetch.
     */
    where: LibraryNodeWhereUniqueInput
  }

  /**
   * LibraryNode findFirst
   */
  export type LibraryNodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    /**
     * Filter, which LibraryNode to fetch.
     */
    where?: LibraryNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LibraryNodes to fetch.
     */
    orderBy?: LibraryNodeOrderByWithRelationInput | LibraryNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LibraryNodes.
     */
    cursor?: LibraryNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LibraryNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LibraryNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LibraryNodes.
     */
    distinct?: LibraryNodeScalarFieldEnum | LibraryNodeScalarFieldEnum[]
  }

  /**
   * LibraryNode findFirstOrThrow
   */
  export type LibraryNodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    /**
     * Filter, which LibraryNode to fetch.
     */
    where?: LibraryNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LibraryNodes to fetch.
     */
    orderBy?: LibraryNodeOrderByWithRelationInput | LibraryNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LibraryNodes.
     */
    cursor?: LibraryNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LibraryNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LibraryNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LibraryNodes.
     */
    distinct?: LibraryNodeScalarFieldEnum | LibraryNodeScalarFieldEnum[]
  }

  /**
   * LibraryNode findMany
   */
  export type LibraryNodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    /**
     * Filter, which LibraryNodes to fetch.
     */
    where?: LibraryNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LibraryNodes to fetch.
     */
    orderBy?: LibraryNodeOrderByWithRelationInput | LibraryNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LibraryNodes.
     */
    cursor?: LibraryNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LibraryNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LibraryNodes.
     */
    skip?: number
    distinct?: LibraryNodeScalarFieldEnum | LibraryNodeScalarFieldEnum[]
  }

  /**
   * LibraryNode create
   */
  export type LibraryNodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    /**
     * The data needed to create a LibraryNode.
     */
    data: XOR<LibraryNodeCreateInput, LibraryNodeUncheckedCreateInput>
  }

  /**
   * LibraryNode createMany
   */
  export type LibraryNodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LibraryNodes.
     */
    data: LibraryNodeCreateManyInput | LibraryNodeCreateManyInput[]
  }

  /**
   * LibraryNode createManyAndReturn
   */
  export type LibraryNodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * The data used to create many LibraryNodes.
     */
    data: LibraryNodeCreateManyInput | LibraryNodeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LibraryNode update
   */
  export type LibraryNodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    /**
     * The data needed to update a LibraryNode.
     */
    data: XOR<LibraryNodeUpdateInput, LibraryNodeUncheckedUpdateInput>
    /**
     * Choose, which LibraryNode to update.
     */
    where: LibraryNodeWhereUniqueInput
  }

  /**
   * LibraryNode updateMany
   */
  export type LibraryNodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LibraryNodes.
     */
    data: XOR<LibraryNodeUpdateManyMutationInput, LibraryNodeUncheckedUpdateManyInput>
    /**
     * Filter which LibraryNodes to update
     */
    where?: LibraryNodeWhereInput
    /**
     * Limit how many LibraryNodes to update.
     */
    limit?: number
  }

  /**
   * LibraryNode updateManyAndReturn
   */
  export type LibraryNodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * The data used to update LibraryNodes.
     */
    data: XOR<LibraryNodeUpdateManyMutationInput, LibraryNodeUncheckedUpdateManyInput>
    /**
     * Filter which LibraryNodes to update
     */
    where?: LibraryNodeWhereInput
    /**
     * Limit how many LibraryNodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LibraryNode upsert
   */
  export type LibraryNodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    /**
     * The filter to search for the LibraryNode to update in case it exists.
     */
    where: LibraryNodeWhereUniqueInput
    /**
     * In case the LibraryNode found by the `where` argument doesn't exist, create a new LibraryNode with this data.
     */
    create: XOR<LibraryNodeCreateInput, LibraryNodeUncheckedCreateInput>
    /**
     * In case the LibraryNode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LibraryNodeUpdateInput, LibraryNodeUncheckedUpdateInput>
  }

  /**
   * LibraryNode delete
   */
  export type LibraryNodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    /**
     * Filter which LibraryNode to delete.
     */
    where: LibraryNodeWhereUniqueInput
  }

  /**
   * LibraryNode deleteMany
   */
  export type LibraryNodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LibraryNodes to delete
     */
    where?: LibraryNodeWhereInput
    /**
     * Limit how many LibraryNodes to delete.
     */
    limit?: number
  }

  /**
   * LibraryNode.parent
   */
  export type LibraryNode$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    where?: LibraryNodeWhereInput
  }

  /**
   * LibraryNode.children
   */
  export type LibraryNode$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
    where?: LibraryNodeWhereInput
    orderBy?: LibraryNodeOrderByWithRelationInput | LibraryNodeOrderByWithRelationInput[]
    cursor?: LibraryNodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LibraryNodeScalarFieldEnum | LibraryNodeScalarFieldEnum[]
  }

  /**
   * LibraryNode without action
   */
  export type LibraryNodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibraryNode
     */
    select?: LibraryNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LibraryNode
     */
    omit?: LibraryNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LibraryNodeInclude<ExtArgs> | null
  }


  /**
   * Model Verse
   */

  export type AggregateVerse = {
    _count: VerseCountAggregateOutputType | null
    _avg: VerseAvgAggregateOutputType | null
    _sum: VerseSumAggregateOutputType | null
    _min: VerseMinAggregateOutputType | null
    _max: VerseMaxAggregateOutputType | null
  }

  export type VerseAvgAggregateOutputType = {
    chapterNumber: number | null
    verseNumber: number | null
  }

  export type VerseSumAggregateOutputType = {
    chapterNumber: number | null
    verseNumber: number | null
  }

  export type VerseMinAggregateOutputType = {
    id: string | null
    chapterNumber: number | null
    verseNumber: number | null
    unitType: string | null
    meter: string | null
    theme: string | null
  }

  export type VerseMaxAggregateOutputType = {
    id: string | null
    chapterNumber: number | null
    verseNumber: number | null
    unitType: string | null
    meter: string | null
    theme: string | null
  }

  export type VerseCountAggregateOutputType = {
    id: number
    chapterNumber: number
    verseNumber: number
    unitType: number
    scripts: number
    synonyms: number
    segmentation: number
    anvaya: number
    anvayaTranslation: number
    meter: number
    theme: number
    relations: number
    _all: number
  }


  export type VerseAvgAggregateInputType = {
    chapterNumber?: true
    verseNumber?: true
  }

  export type VerseSumAggregateInputType = {
    chapterNumber?: true
    verseNumber?: true
  }

  export type VerseMinAggregateInputType = {
    id?: true
    chapterNumber?: true
    verseNumber?: true
    unitType?: true
    meter?: true
    theme?: true
  }

  export type VerseMaxAggregateInputType = {
    id?: true
    chapterNumber?: true
    verseNumber?: true
    unitType?: true
    meter?: true
    theme?: true
  }

  export type VerseCountAggregateInputType = {
    id?: true
    chapterNumber?: true
    verseNumber?: true
    unitType?: true
    scripts?: true
    synonyms?: true
    segmentation?: true
    anvaya?: true
    anvayaTranslation?: true
    meter?: true
    theme?: true
    relations?: true
    _all?: true
  }

  export type VerseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verse to aggregate.
     */
    where?: VerseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verses to fetch.
     */
    orderBy?: VerseOrderByWithRelationInput | VerseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verses
    **/
    _count?: true | VerseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VerseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VerseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerseMaxAggregateInputType
  }

  export type GetVerseAggregateType<T extends VerseAggregateArgs> = {
        [P in keyof T & keyof AggregateVerse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerse[P]>
      : GetScalarType<T[P], AggregateVerse[P]>
  }




  export type VerseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerseWhereInput
    orderBy?: VerseOrderByWithAggregationInput | VerseOrderByWithAggregationInput[]
    by: VerseScalarFieldEnum[] | VerseScalarFieldEnum
    having?: VerseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerseCountAggregateInputType | true
    _avg?: VerseAvgAggregateInputType
    _sum?: VerseSumAggregateInputType
    _min?: VerseMinAggregateInputType
    _max?: VerseMaxAggregateInputType
  }

  export type VerseGroupByOutputType = {
    id: string
    chapterNumber: number
    verseNumber: number
    unitType: string | null
    scripts: JsonValue | null
    synonyms: JsonValue | null
    segmentation: JsonValue | null
    anvaya: JsonValue | null
    anvayaTranslation: JsonValue | null
    meter: string | null
    theme: string | null
    relations: JsonValue | null
    _count: VerseCountAggregateOutputType | null
    _avg: VerseAvgAggregateOutputType | null
    _sum: VerseSumAggregateOutputType | null
    _min: VerseMinAggregateOutputType | null
    _max: VerseMaxAggregateOutputType | null
  }

  type GetVerseGroupByPayload<T extends VerseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerseGroupByOutputType[P]>
            : GetScalarType<T[P], VerseGroupByOutputType[P]>
        }
      >
    >


  export type VerseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chapterNumber?: boolean
    verseNumber?: boolean
    unitType?: boolean
    scripts?: boolean
    synonyms?: boolean
    segmentation?: boolean
    anvaya?: boolean
    anvayaTranslation?: boolean
    meter?: boolean
    theme?: boolean
    relations?: boolean
    commentaries?: boolean | Verse$commentariesArgs<ExtArgs>
    translations?: boolean | Verse$translationsArgs<ExtArgs>
    _count?: boolean | VerseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verse"]>

  export type VerseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chapterNumber?: boolean
    verseNumber?: boolean
    unitType?: boolean
    scripts?: boolean
    synonyms?: boolean
    segmentation?: boolean
    anvaya?: boolean
    anvayaTranslation?: boolean
    meter?: boolean
    theme?: boolean
    relations?: boolean
  }, ExtArgs["result"]["verse"]>

  export type VerseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chapterNumber?: boolean
    verseNumber?: boolean
    unitType?: boolean
    scripts?: boolean
    synonyms?: boolean
    segmentation?: boolean
    anvaya?: boolean
    anvayaTranslation?: boolean
    meter?: boolean
    theme?: boolean
    relations?: boolean
  }, ExtArgs["result"]["verse"]>

  export type VerseSelectScalar = {
    id?: boolean
    chapterNumber?: boolean
    verseNumber?: boolean
    unitType?: boolean
    scripts?: boolean
    synonyms?: boolean
    segmentation?: boolean
    anvaya?: boolean
    anvayaTranslation?: boolean
    meter?: boolean
    theme?: boolean
    relations?: boolean
  }

  export type VerseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chapterNumber" | "verseNumber" | "unitType" | "scripts" | "synonyms" | "segmentation" | "anvaya" | "anvayaTranslation" | "meter" | "theme" | "relations", ExtArgs["result"]["verse"]>
  export type VerseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentaries?: boolean | Verse$commentariesArgs<ExtArgs>
    translations?: boolean | Verse$translationsArgs<ExtArgs>
    _count?: boolean | VerseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VerseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VerseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VersePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verse"
    objects: {
      commentaries: Prisma.$CommentaryPayload<ExtArgs>[]
      translations: Prisma.$TranslationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chapterNumber: number
      verseNumber: number
      unitType: string | null
      scripts: Prisma.JsonValue | null
      synonyms: Prisma.JsonValue | null
      segmentation: Prisma.JsonValue | null
      anvaya: Prisma.JsonValue | null
      anvayaTranslation: Prisma.JsonValue | null
      meter: string | null
      theme: string | null
      relations: Prisma.JsonValue | null
    }, ExtArgs["result"]["verse"]>
    composites: {}
  }

  type VerseGetPayload<S extends boolean | null | undefined | VerseDefaultArgs> = $Result.GetResult<Prisma.$VersePayload, S>

  type VerseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerseCountAggregateInputType | true
    }

  export interface VerseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verse'], meta: { name: 'Verse' } }
    /**
     * Find zero or one Verse that matches the filter.
     * @param {VerseFindUniqueArgs} args - Arguments to find a Verse
     * @example
     * // Get one Verse
     * const verse = await prisma.verse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerseFindUniqueArgs>(args: SelectSubset<T, VerseFindUniqueArgs<ExtArgs>>): Prisma__VerseClient<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Verse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerseFindUniqueOrThrowArgs} args - Arguments to find a Verse
     * @example
     * // Get one Verse
     * const verse = await prisma.verse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerseFindUniqueOrThrowArgs>(args: SelectSubset<T, VerseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerseClient<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Verse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerseFindFirstArgs} args - Arguments to find a Verse
     * @example
     * // Get one Verse
     * const verse = await prisma.verse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerseFindFirstArgs>(args?: SelectSubset<T, VerseFindFirstArgs<ExtArgs>>): Prisma__VerseClient<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Verse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerseFindFirstOrThrowArgs} args - Arguments to find a Verse
     * @example
     * // Get one Verse
     * const verse = await prisma.verse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerseFindFirstOrThrowArgs>(args?: SelectSubset<T, VerseFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerseClient<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Verses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verses
     * const verses = await prisma.verse.findMany()
     * 
     * // Get first 10 Verses
     * const verses = await prisma.verse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verseWithIdOnly = await prisma.verse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerseFindManyArgs>(args?: SelectSubset<T, VerseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Verse.
     * @param {VerseCreateArgs} args - Arguments to create a Verse.
     * @example
     * // Create one Verse
     * const Verse = await prisma.verse.create({
     *   data: {
     *     // ... data to create a Verse
     *   }
     * })
     * 
     */
    create<T extends VerseCreateArgs>(args: SelectSubset<T, VerseCreateArgs<ExtArgs>>): Prisma__VerseClient<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Verses.
     * @param {VerseCreateManyArgs} args - Arguments to create many Verses.
     * @example
     * // Create many Verses
     * const verse = await prisma.verse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerseCreateManyArgs>(args?: SelectSubset<T, VerseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verses and returns the data saved in the database.
     * @param {VerseCreateManyAndReturnArgs} args - Arguments to create many Verses.
     * @example
     * // Create many Verses
     * const verse = await prisma.verse.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verses and only return the `id`
     * const verseWithIdOnly = await prisma.verse.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerseCreateManyAndReturnArgs>(args?: SelectSubset<T, VerseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Verse.
     * @param {VerseDeleteArgs} args - Arguments to delete one Verse.
     * @example
     * // Delete one Verse
     * const Verse = await prisma.verse.delete({
     *   where: {
     *     // ... filter to delete one Verse
     *   }
     * })
     * 
     */
    delete<T extends VerseDeleteArgs>(args: SelectSubset<T, VerseDeleteArgs<ExtArgs>>): Prisma__VerseClient<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Verse.
     * @param {VerseUpdateArgs} args - Arguments to update one Verse.
     * @example
     * // Update one Verse
     * const verse = await prisma.verse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerseUpdateArgs>(args: SelectSubset<T, VerseUpdateArgs<ExtArgs>>): Prisma__VerseClient<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Verses.
     * @param {VerseDeleteManyArgs} args - Arguments to filter Verses to delete.
     * @example
     * // Delete a few Verses
     * const { count } = await prisma.verse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerseDeleteManyArgs>(args?: SelectSubset<T, VerseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verses
     * const verse = await prisma.verse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerseUpdateManyArgs>(args: SelectSubset<T, VerseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verses and returns the data updated in the database.
     * @param {VerseUpdateManyAndReturnArgs} args - Arguments to update many Verses.
     * @example
     * // Update many Verses
     * const verse = await prisma.verse.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verses and only return the `id`
     * const verseWithIdOnly = await prisma.verse.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerseUpdateManyAndReturnArgs>(args: SelectSubset<T, VerseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Verse.
     * @param {VerseUpsertArgs} args - Arguments to update or create a Verse.
     * @example
     * // Update or create a Verse
     * const verse = await prisma.verse.upsert({
     *   create: {
     *     // ... data to create a Verse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verse we want to update
     *   }
     * })
     */
    upsert<T extends VerseUpsertArgs>(args: SelectSubset<T, VerseUpsertArgs<ExtArgs>>): Prisma__VerseClient<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Verses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerseCountArgs} args - Arguments to filter Verses to count.
     * @example
     * // Count the number of Verses
     * const count = await prisma.verse.count({
     *   where: {
     *     // ... the filter for the Verses we want to count
     *   }
     * })
    **/
    count<T extends VerseCountArgs>(
      args?: Subset<T, VerseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerseAggregateArgs>(args: Subset<T, VerseAggregateArgs>): Prisma.PrismaPromise<GetVerseAggregateType<T>>

    /**
     * Group by Verse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerseGroupByArgs['orderBy'] }
        : { orderBy?: VerseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verse model
   */
  readonly fields: VerseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    commentaries<T extends Verse$commentariesArgs<ExtArgs> = {}>(args?: Subset<T, Verse$commentariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    translations<T extends Verse$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Verse$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verse model
   */ 
  interface VerseFieldRefs {
    readonly id: FieldRef<"Verse", 'String'>
    readonly chapterNumber: FieldRef<"Verse", 'Int'>
    readonly verseNumber: FieldRef<"Verse", 'Int'>
    readonly unitType: FieldRef<"Verse", 'String'>
    readonly scripts: FieldRef<"Verse", 'Json'>
    readonly synonyms: FieldRef<"Verse", 'Json'>
    readonly segmentation: FieldRef<"Verse", 'Json'>
    readonly anvaya: FieldRef<"Verse", 'Json'>
    readonly anvayaTranslation: FieldRef<"Verse", 'Json'>
    readonly meter: FieldRef<"Verse", 'String'>
    readonly theme: FieldRef<"Verse", 'String'>
    readonly relations: FieldRef<"Verse", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Verse findUnique
   */
  export type VerseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerseInclude<ExtArgs> | null
    /**
     * Filter, which Verse to fetch.
     */
    where: VerseWhereUniqueInput
  }

  /**
   * Verse findUniqueOrThrow
   */
  export type VerseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerseInclude<ExtArgs> | null
    /**
     * Filter, which Verse to fetch.
     */
    where: VerseWhereUniqueInput
  }

  /**
   * Verse findFirst
   */
  export type VerseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerseInclude<ExtArgs> | null
    /**
     * Filter, which Verse to fetch.
     */
    where?: VerseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verses to fetch.
     */
    orderBy?: VerseOrderByWithRelationInput | VerseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verses.
     */
    cursor?: VerseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verses.
     */
    distinct?: VerseScalarFieldEnum | VerseScalarFieldEnum[]
  }

  /**
   * Verse findFirstOrThrow
   */
  export type VerseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerseInclude<ExtArgs> | null
    /**
     * Filter, which Verse to fetch.
     */
    where?: VerseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verses to fetch.
     */
    orderBy?: VerseOrderByWithRelationInput | VerseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verses.
     */
    cursor?: VerseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verses.
     */
    distinct?: VerseScalarFieldEnum | VerseScalarFieldEnum[]
  }

  /**
   * Verse findMany
   */
  export type VerseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerseInclude<ExtArgs> | null
    /**
     * Filter, which Verses to fetch.
     */
    where?: VerseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verses to fetch.
     */
    orderBy?: VerseOrderByWithRelationInput | VerseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verses.
     */
    cursor?: VerseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verses.
     */
    skip?: number
    distinct?: VerseScalarFieldEnum | VerseScalarFieldEnum[]
  }

  /**
   * Verse create
   */
  export type VerseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerseInclude<ExtArgs> | null
    /**
     * The data needed to create a Verse.
     */
    data: XOR<VerseCreateInput, VerseUncheckedCreateInput>
  }

  /**
   * Verse createMany
   */
  export type VerseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verses.
     */
    data: VerseCreateManyInput | VerseCreateManyInput[]
  }

  /**
   * Verse createManyAndReturn
   */
  export type VerseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * The data used to create many Verses.
     */
    data: VerseCreateManyInput | VerseCreateManyInput[]
  }

  /**
   * Verse update
   */
  export type VerseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerseInclude<ExtArgs> | null
    /**
     * The data needed to update a Verse.
     */
    data: XOR<VerseUpdateInput, VerseUncheckedUpdateInput>
    /**
     * Choose, which Verse to update.
     */
    where: VerseWhereUniqueInput
  }

  /**
   * Verse updateMany
   */
  export type VerseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verses.
     */
    data: XOR<VerseUpdateManyMutationInput, VerseUncheckedUpdateManyInput>
    /**
     * Filter which Verses to update
     */
    where?: VerseWhereInput
    /**
     * Limit how many Verses to update.
     */
    limit?: number
  }

  /**
   * Verse updateManyAndReturn
   */
  export type VerseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * The data used to update Verses.
     */
    data: XOR<VerseUpdateManyMutationInput, VerseUncheckedUpdateManyInput>
    /**
     * Filter which Verses to update
     */
    where?: VerseWhereInput
    /**
     * Limit how many Verses to update.
     */
    limit?: number
  }

  /**
   * Verse upsert
   */
  export type VerseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerseInclude<ExtArgs> | null
    /**
     * The filter to search for the Verse to update in case it exists.
     */
    where: VerseWhereUniqueInput
    /**
     * In case the Verse found by the `where` argument doesn't exist, create a new Verse with this data.
     */
    create: XOR<VerseCreateInput, VerseUncheckedCreateInput>
    /**
     * In case the Verse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerseUpdateInput, VerseUncheckedUpdateInput>
  }

  /**
   * Verse delete
   */
  export type VerseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerseInclude<ExtArgs> | null
    /**
     * Filter which Verse to delete.
     */
    where: VerseWhereUniqueInput
  }

  /**
   * Verse deleteMany
   */
  export type VerseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verses to delete
     */
    where?: VerseWhereInput
    /**
     * Limit how many Verses to delete.
     */
    limit?: number
  }

  /**
   * Verse.commentaries
   */
  export type Verse$commentariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    where?: CommentaryWhereInput
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    cursor?: CommentaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentaryScalarFieldEnum | CommentaryScalarFieldEnum[]
  }

  /**
   * Verse.translations
   */
  export type Verse$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    where?: TranslationWhereInput
    orderBy?: TranslationOrderByWithRelationInput | TranslationOrderByWithRelationInput[]
    cursor?: TranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TranslationScalarFieldEnum | TranslationScalarFieldEnum[]
  }

  /**
   * Verse without action
   */
  export type VerseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verse
     */
    select?: VerseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verse
     */
    omit?: VerseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerseInclude<ExtArgs> | null
  }


  /**
   * Model Author
   */

  export type AggregateAuthor = {
    _count: AuthorCountAggregateOutputType | null
    _avg: AuthorAvgAggregateOutputType | null
    _sum: AuthorSumAggregateOutputType | null
    _min: AuthorMinAggregateOutputType | null
    _max: AuthorMaxAggregateOutputType | null
  }

  export type AuthorAvgAggregateOutputType = {
    id: number | null
  }

  export type AuthorSumAggregateOutputType = {
    id: number | null
  }

  export type AuthorMinAggregateOutputType = {
    id: number | null
    name: string | null
    role: string | null
    sampradaya: string | null
    description: string | null
  }

  export type AuthorMaxAggregateOutputType = {
    id: number | null
    name: string | null
    role: string | null
    sampradaya: string | null
    description: string | null
  }

  export type AuthorCountAggregateOutputType = {
    id: number
    name: number
    role: number
    sampradaya: number
    description: number
    _all: number
  }


  export type AuthorAvgAggregateInputType = {
    id?: true
  }

  export type AuthorSumAggregateInputType = {
    id?: true
  }

  export type AuthorMinAggregateInputType = {
    id?: true
    name?: true
    role?: true
    sampradaya?: true
    description?: true
  }

  export type AuthorMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    sampradaya?: true
    description?: true
  }

  export type AuthorCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    sampradaya?: true
    description?: true
    _all?: true
  }

  export type AuthorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Author to aggregate.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Authors
    **/
    _count?: true | AuthorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthorMaxAggregateInputType
  }

  export type GetAuthorAggregateType<T extends AuthorAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthor[P]>
      : GetScalarType<T[P], AggregateAuthor[P]>
  }




  export type AuthorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorWhereInput
    orderBy?: AuthorOrderByWithAggregationInput | AuthorOrderByWithAggregationInput[]
    by: AuthorScalarFieldEnum[] | AuthorScalarFieldEnum
    having?: AuthorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthorCountAggregateInputType | true
    _avg?: AuthorAvgAggregateInputType
    _sum?: AuthorSumAggregateInputType
    _min?: AuthorMinAggregateInputType
    _max?: AuthorMaxAggregateInputType
  }

  export type AuthorGroupByOutputType = {
    id: number
    name: string
    role: string | null
    sampradaya: string | null
    description: string | null
    _count: AuthorCountAggregateOutputType | null
    _avg: AuthorAvgAggregateOutputType | null
    _sum: AuthorSumAggregateOutputType | null
    _min: AuthorMinAggregateOutputType | null
    _max: AuthorMaxAggregateOutputType | null
  }

  type GetAuthorGroupByPayload<T extends AuthorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthorGroupByOutputType[P]>
            : GetScalarType<T[P], AuthorGroupByOutputType[P]>
        }
      >
    >


  export type AuthorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    sampradaya?: boolean
    description?: boolean
    translations?: boolean | Author$translationsArgs<ExtArgs>
    commentaries?: boolean | Author$commentariesArgs<ExtArgs>
    _count?: boolean | AuthorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["author"]>

  export type AuthorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    sampradaya?: boolean
    description?: boolean
  }, ExtArgs["result"]["author"]>

  export type AuthorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    sampradaya?: boolean
    description?: boolean
  }, ExtArgs["result"]["author"]>

  export type AuthorSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    sampradaya?: boolean
    description?: boolean
  }

  export type AuthorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "role" | "sampradaya" | "description", ExtArgs["result"]["author"]>
  export type AuthorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | Author$translationsArgs<ExtArgs>
    commentaries?: boolean | Author$commentariesArgs<ExtArgs>
    _count?: boolean | AuthorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AuthorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AuthorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AuthorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Author"
    objects: {
      translations: Prisma.$TranslationPayload<ExtArgs>[]
      commentaries: Prisma.$CommentaryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      role: string | null
      sampradaya: string | null
      description: string | null
    }, ExtArgs["result"]["author"]>
    composites: {}
  }

  type AuthorGetPayload<S extends boolean | null | undefined | AuthorDefaultArgs> = $Result.GetResult<Prisma.$AuthorPayload, S>

  type AuthorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthorCountAggregateInputType | true
    }

  export interface AuthorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Author'], meta: { name: 'Author' } }
    /**
     * Find zero or one Author that matches the filter.
     * @param {AuthorFindUniqueArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthorFindUniqueArgs>(args: SelectSubset<T, AuthorFindUniqueArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Author that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthorFindUniqueOrThrowArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthorFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Author that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorFindFirstArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthorFindFirstArgs>(args?: SelectSubset<T, AuthorFindFirstArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Author that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorFindFirstOrThrowArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthorFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthorFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Authors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Authors
     * const authors = await prisma.author.findMany()
     * 
     * // Get first 10 Authors
     * const authors = await prisma.author.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authorWithIdOnly = await prisma.author.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthorFindManyArgs>(args?: SelectSubset<T, AuthorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Author.
     * @param {AuthorCreateArgs} args - Arguments to create a Author.
     * @example
     * // Create one Author
     * const Author = await prisma.author.create({
     *   data: {
     *     // ... data to create a Author
     *   }
     * })
     * 
     */
    create<T extends AuthorCreateArgs>(args: SelectSubset<T, AuthorCreateArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Authors.
     * @param {AuthorCreateManyArgs} args - Arguments to create many Authors.
     * @example
     * // Create many Authors
     * const author = await prisma.author.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthorCreateManyArgs>(args?: SelectSubset<T, AuthorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Authors and returns the data saved in the database.
     * @param {AuthorCreateManyAndReturnArgs} args - Arguments to create many Authors.
     * @example
     * // Create many Authors
     * const author = await prisma.author.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Authors and only return the `id`
     * const authorWithIdOnly = await prisma.author.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthorCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Author.
     * @param {AuthorDeleteArgs} args - Arguments to delete one Author.
     * @example
     * // Delete one Author
     * const Author = await prisma.author.delete({
     *   where: {
     *     // ... filter to delete one Author
     *   }
     * })
     * 
     */
    delete<T extends AuthorDeleteArgs>(args: SelectSubset<T, AuthorDeleteArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Author.
     * @param {AuthorUpdateArgs} args - Arguments to update one Author.
     * @example
     * // Update one Author
     * const author = await prisma.author.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthorUpdateArgs>(args: SelectSubset<T, AuthorUpdateArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Authors.
     * @param {AuthorDeleteManyArgs} args - Arguments to filter Authors to delete.
     * @example
     * // Delete a few Authors
     * const { count } = await prisma.author.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthorDeleteManyArgs>(args?: SelectSubset<T, AuthorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Authors
     * const author = await prisma.author.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthorUpdateManyArgs>(args: SelectSubset<T, AuthorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authors and returns the data updated in the database.
     * @param {AuthorUpdateManyAndReturnArgs} args - Arguments to update many Authors.
     * @example
     * // Update many Authors
     * const author = await prisma.author.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Authors and only return the `id`
     * const authorWithIdOnly = await prisma.author.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthorUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Author.
     * @param {AuthorUpsertArgs} args - Arguments to update or create a Author.
     * @example
     * // Update or create a Author
     * const author = await prisma.author.upsert({
     *   create: {
     *     // ... data to create a Author
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Author we want to update
     *   }
     * })
     */
    upsert<T extends AuthorUpsertArgs>(args: SelectSubset<T, AuthorUpsertArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorCountArgs} args - Arguments to filter Authors to count.
     * @example
     * // Count the number of Authors
     * const count = await prisma.author.count({
     *   where: {
     *     // ... the filter for the Authors we want to count
     *   }
     * })
    **/
    count<T extends AuthorCountArgs>(
      args?: Subset<T, AuthorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Author.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthorAggregateArgs>(args: Subset<T, AuthorAggregateArgs>): Prisma.PrismaPromise<GetAuthorAggregateType<T>>

    /**
     * Group by Author.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthorGroupByArgs['orderBy'] }
        : { orderBy?: AuthorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Author model
   */
  readonly fields: AuthorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Author.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    translations<T extends Author$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Author$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    commentaries<T extends Author$commentariesArgs<ExtArgs> = {}>(args?: Subset<T, Author$commentariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Author model
   */ 
  interface AuthorFieldRefs {
    readonly id: FieldRef<"Author", 'Int'>
    readonly name: FieldRef<"Author", 'String'>
    readonly role: FieldRef<"Author", 'String'>
    readonly sampradaya: FieldRef<"Author", 'String'>
    readonly description: FieldRef<"Author", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Author findUnique
   */
  export type AuthorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author findUniqueOrThrow
   */
  export type AuthorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author findFirst
   */
  export type AuthorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authors.
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authors.
     */
    distinct?: AuthorScalarFieldEnum | AuthorScalarFieldEnum[]
  }

  /**
   * Author findFirstOrThrow
   */
  export type AuthorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authors.
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authors.
     */
    distinct?: AuthorScalarFieldEnum | AuthorScalarFieldEnum[]
  }

  /**
   * Author findMany
   */
  export type AuthorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Authors to fetch.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Authors.
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    distinct?: AuthorScalarFieldEnum | AuthorScalarFieldEnum[]
  }

  /**
   * Author create
   */
  export type AuthorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * The data needed to create a Author.
     */
    data: XOR<AuthorCreateInput, AuthorUncheckedCreateInput>
  }

  /**
   * Author createMany
   */
  export type AuthorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Authors.
     */
    data: AuthorCreateManyInput | AuthorCreateManyInput[]
  }

  /**
   * Author createManyAndReturn
   */
  export type AuthorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * The data used to create many Authors.
     */
    data: AuthorCreateManyInput | AuthorCreateManyInput[]
  }

  /**
   * Author update
   */
  export type AuthorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * The data needed to update a Author.
     */
    data: XOR<AuthorUpdateInput, AuthorUncheckedUpdateInput>
    /**
     * Choose, which Author to update.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author updateMany
   */
  export type AuthorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Authors.
     */
    data: XOR<AuthorUpdateManyMutationInput, AuthorUncheckedUpdateManyInput>
    /**
     * Filter which Authors to update
     */
    where?: AuthorWhereInput
    /**
     * Limit how many Authors to update.
     */
    limit?: number
  }

  /**
   * Author updateManyAndReturn
   */
  export type AuthorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * The data used to update Authors.
     */
    data: XOR<AuthorUpdateManyMutationInput, AuthorUncheckedUpdateManyInput>
    /**
     * Filter which Authors to update
     */
    where?: AuthorWhereInput
    /**
     * Limit how many Authors to update.
     */
    limit?: number
  }

  /**
   * Author upsert
   */
  export type AuthorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * The filter to search for the Author to update in case it exists.
     */
    where: AuthorWhereUniqueInput
    /**
     * In case the Author found by the `where` argument doesn't exist, create a new Author with this data.
     */
    create: XOR<AuthorCreateInput, AuthorUncheckedCreateInput>
    /**
     * In case the Author was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthorUpdateInput, AuthorUncheckedUpdateInput>
  }

  /**
   * Author delete
   */
  export type AuthorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter which Author to delete.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author deleteMany
   */
  export type AuthorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authors to delete
     */
    where?: AuthorWhereInput
    /**
     * Limit how many Authors to delete.
     */
    limit?: number
  }

  /**
   * Author.translations
   */
  export type Author$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    where?: TranslationWhereInput
    orderBy?: TranslationOrderByWithRelationInput | TranslationOrderByWithRelationInput[]
    cursor?: TranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TranslationScalarFieldEnum | TranslationScalarFieldEnum[]
  }

  /**
   * Author.commentaries
   */
  export type Author$commentariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    where?: CommentaryWhereInput
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    cursor?: CommentaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentaryScalarFieldEnum | CommentaryScalarFieldEnum[]
  }

  /**
   * Author without action
   */
  export type AuthorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
  }


  /**
   * Model Translation
   */

  export type AggregateTranslation = {
    _count: TranslationCountAggregateOutputType | null
    _avg: TranslationAvgAggregateOutputType | null
    _sum: TranslationSumAggregateOutputType | null
    _min: TranslationMinAggregateOutputType | null
    _max: TranslationMaxAggregateOutputType | null
  }

  export type TranslationAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type TranslationSumAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type TranslationMinAggregateOutputType = {
    id: number | null
    verseId: string | null
    authorId: number | null
    language: string | null
    description: string | null
  }

  export type TranslationMaxAggregateOutputType = {
    id: number | null
    verseId: string | null
    authorId: number | null
    language: string | null
    description: string | null
  }

  export type TranslationCountAggregateOutputType = {
    id: number
    verseId: number
    authorId: number
    language: number
    description: number
    _all: number
  }


  export type TranslationAvgAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type TranslationSumAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type TranslationMinAggregateInputType = {
    id?: true
    verseId?: true
    authorId?: true
    language?: true
    description?: true
  }

  export type TranslationMaxAggregateInputType = {
    id?: true
    verseId?: true
    authorId?: true
    language?: true
    description?: true
  }

  export type TranslationCountAggregateInputType = {
    id?: true
    verseId?: true
    authorId?: true
    language?: true
    description?: true
    _all?: true
  }

  export type TranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Translation to aggregate.
     */
    where?: TranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Translations to fetch.
     */
    orderBy?: TranslationOrderByWithRelationInput | TranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Translations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Translations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Translations
    **/
    _count?: true | TranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TranslationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TranslationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TranslationMaxAggregateInputType
  }

  export type GetTranslationAggregateType<T extends TranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTranslation[P]>
      : GetScalarType<T[P], AggregateTranslation[P]>
  }




  export type TranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TranslationWhereInput
    orderBy?: TranslationOrderByWithAggregationInput | TranslationOrderByWithAggregationInput[]
    by: TranslationScalarFieldEnum[] | TranslationScalarFieldEnum
    having?: TranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TranslationCountAggregateInputType | true
    _avg?: TranslationAvgAggregateInputType
    _sum?: TranslationSumAggregateInputType
    _min?: TranslationMinAggregateInputType
    _max?: TranslationMaxAggregateInputType
  }

  export type TranslationGroupByOutputType = {
    id: number
    verseId: string
    authorId: number
    language: string
    description: string
    _count: TranslationCountAggregateOutputType | null
    _avg: TranslationAvgAggregateOutputType | null
    _sum: TranslationSumAggregateOutputType | null
    _min: TranslationMinAggregateOutputType | null
    _max: TranslationMaxAggregateOutputType | null
  }

  type GetTranslationGroupByPayload<T extends TranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TranslationGroupByOutputType[P]>
            : GetScalarType<T[P], TranslationGroupByOutputType[P]>
        }
      >
    >


  export type TranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    verseId?: boolean
    authorId?: boolean
    language?: boolean
    description?: boolean
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["translation"]>

  export type TranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    verseId?: boolean
    authorId?: boolean
    language?: boolean
    description?: boolean
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["translation"]>

  export type TranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    verseId?: boolean
    authorId?: boolean
    language?: boolean
    description?: boolean
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["translation"]>

  export type TranslationSelectScalar = {
    id?: boolean
    verseId?: boolean
    authorId?: boolean
    language?: boolean
    description?: boolean
  }

  export type TranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "verseId" | "authorId" | "language" | "description", ExtArgs["result"]["translation"]>
  export type TranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }
  export type TranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }
  export type TranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }

  export type $TranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Translation"
    objects: {
      verse: Prisma.$VersePayload<ExtArgs>
      author: Prisma.$AuthorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      verseId: string
      authorId: number
      language: string
      description: string
    }, ExtArgs["result"]["translation"]>
    composites: {}
  }

  type TranslationGetPayload<S extends boolean | null | undefined | TranslationDefaultArgs> = $Result.GetResult<Prisma.$TranslationPayload, S>

  type TranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TranslationCountAggregateInputType | true
    }

  export interface TranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Translation'], meta: { name: 'Translation' } }
    /**
     * Find zero or one Translation that matches the filter.
     * @param {TranslationFindUniqueArgs} args - Arguments to find a Translation
     * @example
     * // Get one Translation
     * const translation = await prisma.translation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TranslationFindUniqueArgs>(args: SelectSubset<T, TranslationFindUniqueArgs<ExtArgs>>): Prisma__TranslationClient<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Translation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TranslationFindUniqueOrThrowArgs} args - Arguments to find a Translation
     * @example
     * // Get one Translation
     * const translation = await prisma.translation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, TranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TranslationClient<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Translation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationFindFirstArgs} args - Arguments to find a Translation
     * @example
     * // Get one Translation
     * const translation = await prisma.translation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TranslationFindFirstArgs>(args?: SelectSubset<T, TranslationFindFirstArgs<ExtArgs>>): Prisma__TranslationClient<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Translation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationFindFirstOrThrowArgs} args - Arguments to find a Translation
     * @example
     * // Get one Translation
     * const translation = await prisma.translation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, TranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__TranslationClient<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Translations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Translations
     * const translations = await prisma.translation.findMany()
     * 
     * // Get first 10 Translations
     * const translations = await prisma.translation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const translationWithIdOnly = await prisma.translation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TranslationFindManyArgs>(args?: SelectSubset<T, TranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Translation.
     * @param {TranslationCreateArgs} args - Arguments to create a Translation.
     * @example
     * // Create one Translation
     * const Translation = await prisma.translation.create({
     *   data: {
     *     // ... data to create a Translation
     *   }
     * })
     * 
     */
    create<T extends TranslationCreateArgs>(args: SelectSubset<T, TranslationCreateArgs<ExtArgs>>): Prisma__TranslationClient<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Translations.
     * @param {TranslationCreateManyArgs} args - Arguments to create many Translations.
     * @example
     * // Create many Translations
     * const translation = await prisma.translation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TranslationCreateManyArgs>(args?: SelectSubset<T, TranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Translations and returns the data saved in the database.
     * @param {TranslationCreateManyAndReturnArgs} args - Arguments to create many Translations.
     * @example
     * // Create many Translations
     * const translation = await prisma.translation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Translations and only return the `id`
     * const translationWithIdOnly = await prisma.translation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, TranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Translation.
     * @param {TranslationDeleteArgs} args - Arguments to delete one Translation.
     * @example
     * // Delete one Translation
     * const Translation = await prisma.translation.delete({
     *   where: {
     *     // ... filter to delete one Translation
     *   }
     * })
     * 
     */
    delete<T extends TranslationDeleteArgs>(args: SelectSubset<T, TranslationDeleteArgs<ExtArgs>>): Prisma__TranslationClient<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Translation.
     * @param {TranslationUpdateArgs} args - Arguments to update one Translation.
     * @example
     * // Update one Translation
     * const translation = await prisma.translation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TranslationUpdateArgs>(args: SelectSubset<T, TranslationUpdateArgs<ExtArgs>>): Prisma__TranslationClient<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Translations.
     * @param {TranslationDeleteManyArgs} args - Arguments to filter Translations to delete.
     * @example
     * // Delete a few Translations
     * const { count } = await prisma.translation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TranslationDeleteManyArgs>(args?: SelectSubset<T, TranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Translations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Translations
     * const translation = await prisma.translation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TranslationUpdateManyArgs>(args: SelectSubset<T, TranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Translations and returns the data updated in the database.
     * @param {TranslationUpdateManyAndReturnArgs} args - Arguments to update many Translations.
     * @example
     * // Update many Translations
     * const translation = await prisma.translation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Translations and only return the `id`
     * const translationWithIdOnly = await prisma.translation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, TranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Translation.
     * @param {TranslationUpsertArgs} args - Arguments to update or create a Translation.
     * @example
     * // Update or create a Translation
     * const translation = await prisma.translation.upsert({
     *   create: {
     *     // ... data to create a Translation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Translation we want to update
     *   }
     * })
     */
    upsert<T extends TranslationUpsertArgs>(args: SelectSubset<T, TranslationUpsertArgs<ExtArgs>>): Prisma__TranslationClient<$Result.GetResult<Prisma.$TranslationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Translations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationCountArgs} args - Arguments to filter Translations to count.
     * @example
     * // Count the number of Translations
     * const count = await prisma.translation.count({
     *   where: {
     *     // ... the filter for the Translations we want to count
     *   }
     * })
    **/
    count<T extends TranslationCountArgs>(
      args?: Subset<T, TranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Translation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TranslationAggregateArgs>(args: Subset<T, TranslationAggregateArgs>): Prisma.PrismaPromise<GetTranslationAggregateType<T>>

    /**
     * Group by Translation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranslationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TranslationGroupByArgs['orderBy'] }
        : { orderBy?: TranslationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Translation model
   */
  readonly fields: TranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Translation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    verse<T extends VerseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VerseDefaultArgs<ExtArgs>>): Prisma__VerseClient<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    author<T extends AuthorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AuthorDefaultArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Translation model
   */ 
  interface TranslationFieldRefs {
    readonly id: FieldRef<"Translation", 'Int'>
    readonly verseId: FieldRef<"Translation", 'String'>
    readonly authorId: FieldRef<"Translation", 'Int'>
    readonly language: FieldRef<"Translation", 'String'>
    readonly description: FieldRef<"Translation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Translation findUnique
   */
  export type TranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    /**
     * Filter, which Translation to fetch.
     */
    where: TranslationWhereUniqueInput
  }

  /**
   * Translation findUniqueOrThrow
   */
  export type TranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    /**
     * Filter, which Translation to fetch.
     */
    where: TranslationWhereUniqueInput
  }

  /**
   * Translation findFirst
   */
  export type TranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    /**
     * Filter, which Translation to fetch.
     */
    where?: TranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Translations to fetch.
     */
    orderBy?: TranslationOrderByWithRelationInput | TranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Translations.
     */
    cursor?: TranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Translations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Translations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Translations.
     */
    distinct?: TranslationScalarFieldEnum | TranslationScalarFieldEnum[]
  }

  /**
   * Translation findFirstOrThrow
   */
  export type TranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    /**
     * Filter, which Translation to fetch.
     */
    where?: TranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Translations to fetch.
     */
    orderBy?: TranslationOrderByWithRelationInput | TranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Translations.
     */
    cursor?: TranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Translations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Translations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Translations.
     */
    distinct?: TranslationScalarFieldEnum | TranslationScalarFieldEnum[]
  }

  /**
   * Translation findMany
   */
  export type TranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    /**
     * Filter, which Translations to fetch.
     */
    where?: TranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Translations to fetch.
     */
    orderBy?: TranslationOrderByWithRelationInput | TranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Translations.
     */
    cursor?: TranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Translations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Translations.
     */
    skip?: number
    distinct?: TranslationScalarFieldEnum | TranslationScalarFieldEnum[]
  }

  /**
   * Translation create
   */
  export type TranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a Translation.
     */
    data: XOR<TranslationCreateInput, TranslationUncheckedCreateInput>
  }

  /**
   * Translation createMany
   */
  export type TranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Translations.
     */
    data: TranslationCreateManyInput | TranslationCreateManyInput[]
  }

  /**
   * Translation createManyAndReturn
   */
  export type TranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * The data used to create many Translations.
     */
    data: TranslationCreateManyInput | TranslationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Translation update
   */
  export type TranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a Translation.
     */
    data: XOR<TranslationUpdateInput, TranslationUncheckedUpdateInput>
    /**
     * Choose, which Translation to update.
     */
    where: TranslationWhereUniqueInput
  }

  /**
   * Translation updateMany
   */
  export type TranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Translations.
     */
    data: XOR<TranslationUpdateManyMutationInput, TranslationUncheckedUpdateManyInput>
    /**
     * Filter which Translations to update
     */
    where?: TranslationWhereInput
    /**
     * Limit how many Translations to update.
     */
    limit?: number
  }

  /**
   * Translation updateManyAndReturn
   */
  export type TranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * The data used to update Translations.
     */
    data: XOR<TranslationUpdateManyMutationInput, TranslationUncheckedUpdateManyInput>
    /**
     * Filter which Translations to update
     */
    where?: TranslationWhereInput
    /**
     * Limit how many Translations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Translation upsert
   */
  export type TranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the Translation to update in case it exists.
     */
    where: TranslationWhereUniqueInput
    /**
     * In case the Translation found by the `where` argument doesn't exist, create a new Translation with this data.
     */
    create: XOR<TranslationCreateInput, TranslationUncheckedCreateInput>
    /**
     * In case the Translation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TranslationUpdateInput, TranslationUncheckedUpdateInput>
  }

  /**
   * Translation delete
   */
  export type TranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
    /**
     * Filter which Translation to delete.
     */
    where: TranslationWhereUniqueInput
  }

  /**
   * Translation deleteMany
   */
  export type TranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Translations to delete
     */
    where?: TranslationWhereInput
    /**
     * Limit how many Translations to delete.
     */
    limit?: number
  }

  /**
   * Translation without action
   */
  export type TranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Translation
     */
    select?: TranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Translation
     */
    omit?: TranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranslationInclude<ExtArgs> | null
  }


  /**
   * Model Commentary
   */

  export type AggregateCommentary = {
    _count: CommentaryCountAggregateOutputType | null
    _avg: CommentaryAvgAggregateOutputType | null
    _sum: CommentarySumAggregateOutputType | null
    _min: CommentaryMinAggregateOutputType | null
    _max: CommentaryMaxAggregateOutputType | null
  }

  export type CommentaryAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type CommentarySumAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type CommentaryMinAggregateOutputType = {
    id: number | null
    verseId: string | null
    authorId: number | null
    language: string | null
    description: string | null
    sampradaya: string | null
  }

  export type CommentaryMaxAggregateOutputType = {
    id: number | null
    verseId: string | null
    authorId: number | null
    language: string | null
    description: string | null
    sampradaya: string | null
  }

  export type CommentaryCountAggregateOutputType = {
    id: number
    verseId: number
    authorId: number
    language: number
    description: number
    sampradaya: number
    subCommentaries: number
    _all: number
  }


  export type CommentaryAvgAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type CommentarySumAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type CommentaryMinAggregateInputType = {
    id?: true
    verseId?: true
    authorId?: true
    language?: true
    description?: true
    sampradaya?: true
  }

  export type CommentaryMaxAggregateInputType = {
    id?: true
    verseId?: true
    authorId?: true
    language?: true
    description?: true
    sampradaya?: true
  }

  export type CommentaryCountAggregateInputType = {
    id?: true
    verseId?: true
    authorId?: true
    language?: true
    description?: true
    sampradaya?: true
    subCommentaries?: true
    _all?: true
  }

  export type CommentaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commentary to aggregate.
     */
    where?: CommentaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commentaries to fetch.
     */
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commentaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commentaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Commentaries
    **/
    _count?: true | CommentaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentaryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentaryMaxAggregateInputType
  }

  export type GetCommentaryAggregateType<T extends CommentaryAggregateArgs> = {
        [P in keyof T & keyof AggregateCommentary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommentary[P]>
      : GetScalarType<T[P], AggregateCommentary[P]>
  }




  export type CommentaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentaryWhereInput
    orderBy?: CommentaryOrderByWithAggregationInput | CommentaryOrderByWithAggregationInput[]
    by: CommentaryScalarFieldEnum[] | CommentaryScalarFieldEnum
    having?: CommentaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentaryCountAggregateInputType | true
    _avg?: CommentaryAvgAggregateInputType
    _sum?: CommentarySumAggregateInputType
    _min?: CommentaryMinAggregateInputType
    _max?: CommentaryMaxAggregateInputType
  }

  export type CommentaryGroupByOutputType = {
    id: number
    verseId: string
    authorId: number
    language: string
    description: string
    sampradaya: string | null
    subCommentaries: JsonValue | null
    _count: CommentaryCountAggregateOutputType | null
    _avg: CommentaryAvgAggregateOutputType | null
    _sum: CommentarySumAggregateOutputType | null
    _min: CommentaryMinAggregateOutputType | null
    _max: CommentaryMaxAggregateOutputType | null
  }

  type GetCommentaryGroupByPayload<T extends CommentaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentaryGroupByOutputType[P]>
            : GetScalarType<T[P], CommentaryGroupByOutputType[P]>
        }
      >
    >


  export type CommentarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    verseId?: boolean
    authorId?: boolean
    language?: boolean
    description?: boolean
    sampradaya?: boolean
    subCommentaries?: boolean
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentary"]>

  export type CommentarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    verseId?: boolean
    authorId?: boolean
    language?: boolean
    description?: boolean
    sampradaya?: boolean
    subCommentaries?: boolean
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentary"]>

  export type CommentarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    verseId?: boolean
    authorId?: boolean
    language?: boolean
    description?: boolean
    sampradaya?: boolean
    subCommentaries?: boolean
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentary"]>

  export type CommentarySelectScalar = {
    id?: boolean
    verseId?: boolean
    authorId?: boolean
    language?: boolean
    description?: boolean
    sampradaya?: boolean
    subCommentaries?: boolean
  }

  export type CommentaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "verseId" | "authorId" | "language" | "description" | "sampradaya" | "subCommentaries", ExtArgs["result"]["commentary"]>
  export type CommentaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }
  export type CommentaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }
  export type CommentaryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verse?: boolean | VerseDefaultArgs<ExtArgs>
    author?: boolean | AuthorDefaultArgs<ExtArgs>
  }

  export type $CommentaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Commentary"
    objects: {
      verse: Prisma.$VersePayload<ExtArgs>
      author: Prisma.$AuthorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      verseId: string
      authorId: number
      language: string
      description: string
      sampradaya: string | null
      subCommentaries: Prisma.JsonValue | null
    }, ExtArgs["result"]["commentary"]>
    composites: {}
  }

  type CommentaryGetPayload<S extends boolean | null | undefined | CommentaryDefaultArgs> = $Result.GetResult<Prisma.$CommentaryPayload, S>

  type CommentaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentaryCountAggregateInputType | true
    }

  export interface CommentaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Commentary'], meta: { name: 'Commentary' } }
    /**
     * Find zero or one Commentary that matches the filter.
     * @param {CommentaryFindUniqueArgs} args - Arguments to find a Commentary
     * @example
     * // Get one Commentary
     * const commentary = await prisma.commentary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentaryFindUniqueArgs>(args: SelectSubset<T, CommentaryFindUniqueArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Commentary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentaryFindUniqueOrThrowArgs} args - Arguments to find a Commentary
     * @example
     * // Get one Commentary
     * const commentary = await prisma.commentary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentaryFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Commentary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryFindFirstArgs} args - Arguments to find a Commentary
     * @example
     * // Get one Commentary
     * const commentary = await prisma.commentary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentaryFindFirstArgs>(args?: SelectSubset<T, CommentaryFindFirstArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Commentary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryFindFirstOrThrowArgs} args - Arguments to find a Commentary
     * @example
     * // Get one Commentary
     * const commentary = await prisma.commentary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentaryFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Commentaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Commentaries
     * const commentaries = await prisma.commentary.findMany()
     * 
     * // Get first 10 Commentaries
     * const commentaries = await prisma.commentary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentaryWithIdOnly = await prisma.commentary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentaryFindManyArgs>(args?: SelectSubset<T, CommentaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Commentary.
     * @param {CommentaryCreateArgs} args - Arguments to create a Commentary.
     * @example
     * // Create one Commentary
     * const Commentary = await prisma.commentary.create({
     *   data: {
     *     // ... data to create a Commentary
     *   }
     * })
     * 
     */
    create<T extends CommentaryCreateArgs>(args: SelectSubset<T, CommentaryCreateArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Commentaries.
     * @param {CommentaryCreateManyArgs} args - Arguments to create many Commentaries.
     * @example
     * // Create many Commentaries
     * const commentary = await prisma.commentary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentaryCreateManyArgs>(args?: SelectSubset<T, CommentaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Commentaries and returns the data saved in the database.
     * @param {CommentaryCreateManyAndReturnArgs} args - Arguments to create many Commentaries.
     * @example
     * // Create many Commentaries
     * const commentary = await prisma.commentary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Commentaries and only return the `id`
     * const commentaryWithIdOnly = await prisma.commentary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentaryCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Commentary.
     * @param {CommentaryDeleteArgs} args - Arguments to delete one Commentary.
     * @example
     * // Delete one Commentary
     * const Commentary = await prisma.commentary.delete({
     *   where: {
     *     // ... filter to delete one Commentary
     *   }
     * })
     * 
     */
    delete<T extends CommentaryDeleteArgs>(args: SelectSubset<T, CommentaryDeleteArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Commentary.
     * @param {CommentaryUpdateArgs} args - Arguments to update one Commentary.
     * @example
     * // Update one Commentary
     * const commentary = await prisma.commentary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentaryUpdateArgs>(args: SelectSubset<T, CommentaryUpdateArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Commentaries.
     * @param {CommentaryDeleteManyArgs} args - Arguments to filter Commentaries to delete.
     * @example
     * // Delete a few Commentaries
     * const { count } = await prisma.commentary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentaryDeleteManyArgs>(args?: SelectSubset<T, CommentaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commentaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Commentaries
     * const commentary = await prisma.commentary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentaryUpdateManyArgs>(args: SelectSubset<T, CommentaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commentaries and returns the data updated in the database.
     * @param {CommentaryUpdateManyAndReturnArgs} args - Arguments to update many Commentaries.
     * @example
     * // Update many Commentaries
     * const commentary = await prisma.commentary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Commentaries and only return the `id`
     * const commentaryWithIdOnly = await prisma.commentary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentaryUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Commentary.
     * @param {CommentaryUpsertArgs} args - Arguments to update or create a Commentary.
     * @example
     * // Update or create a Commentary
     * const commentary = await prisma.commentary.upsert({
     *   create: {
     *     // ... data to create a Commentary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Commentary we want to update
     *   }
     * })
     */
    upsert<T extends CommentaryUpsertArgs>(args: SelectSubset<T, CommentaryUpsertArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Commentaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryCountArgs} args - Arguments to filter Commentaries to count.
     * @example
     * // Count the number of Commentaries
     * const count = await prisma.commentary.count({
     *   where: {
     *     // ... the filter for the Commentaries we want to count
     *   }
     * })
    **/
    count<T extends CommentaryCountArgs>(
      args?: Subset<T, CommentaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Commentary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentaryAggregateArgs>(args: Subset<T, CommentaryAggregateArgs>): Prisma.PrismaPromise<GetCommentaryAggregateType<T>>

    /**
     * Group by Commentary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentaryGroupByArgs['orderBy'] }
        : { orderBy?: CommentaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Commentary model
   */
  readonly fields: CommentaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Commentary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    verse<T extends VerseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VerseDefaultArgs<ExtArgs>>): Prisma__VerseClient<$Result.GetResult<Prisma.$VersePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    author<T extends AuthorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AuthorDefaultArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Commentary model
   */ 
  interface CommentaryFieldRefs {
    readonly id: FieldRef<"Commentary", 'Int'>
    readonly verseId: FieldRef<"Commentary", 'String'>
    readonly authorId: FieldRef<"Commentary", 'Int'>
    readonly language: FieldRef<"Commentary", 'String'>
    readonly description: FieldRef<"Commentary", 'String'>
    readonly sampradaya: FieldRef<"Commentary", 'String'>
    readonly subCommentaries: FieldRef<"Commentary", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Commentary findUnique
   */
  export type CommentaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter, which Commentary to fetch.
     */
    where: CommentaryWhereUniqueInput
  }

  /**
   * Commentary findUniqueOrThrow
   */
  export type CommentaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter, which Commentary to fetch.
     */
    where: CommentaryWhereUniqueInput
  }

  /**
   * Commentary findFirst
   */
  export type CommentaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter, which Commentary to fetch.
     */
    where?: CommentaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commentaries to fetch.
     */
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commentaries.
     */
    cursor?: CommentaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commentaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commentaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commentaries.
     */
    distinct?: CommentaryScalarFieldEnum | CommentaryScalarFieldEnum[]
  }

  /**
   * Commentary findFirstOrThrow
   */
  export type CommentaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter, which Commentary to fetch.
     */
    where?: CommentaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commentaries to fetch.
     */
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commentaries.
     */
    cursor?: CommentaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commentaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commentaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commentaries.
     */
    distinct?: CommentaryScalarFieldEnum | CommentaryScalarFieldEnum[]
  }

  /**
   * Commentary findMany
   */
  export type CommentaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter, which Commentaries to fetch.
     */
    where?: CommentaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commentaries to fetch.
     */
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Commentaries.
     */
    cursor?: CommentaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commentaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commentaries.
     */
    skip?: number
    distinct?: CommentaryScalarFieldEnum | CommentaryScalarFieldEnum[]
  }

  /**
   * Commentary create
   */
  export type CommentaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * The data needed to create a Commentary.
     */
    data: XOR<CommentaryCreateInput, CommentaryUncheckedCreateInput>
  }

  /**
   * Commentary createMany
   */
  export type CommentaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Commentaries.
     */
    data: CommentaryCreateManyInput | CommentaryCreateManyInput[]
  }

  /**
   * Commentary createManyAndReturn
   */
  export type CommentaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * The data used to create many Commentaries.
     */
    data: CommentaryCreateManyInput | CommentaryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commentary update
   */
  export type CommentaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * The data needed to update a Commentary.
     */
    data: XOR<CommentaryUpdateInput, CommentaryUncheckedUpdateInput>
    /**
     * Choose, which Commentary to update.
     */
    where: CommentaryWhereUniqueInput
  }

  /**
   * Commentary updateMany
   */
  export type CommentaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Commentaries.
     */
    data: XOR<CommentaryUpdateManyMutationInput, CommentaryUncheckedUpdateManyInput>
    /**
     * Filter which Commentaries to update
     */
    where?: CommentaryWhereInput
    /**
     * Limit how many Commentaries to update.
     */
    limit?: number
  }

  /**
   * Commentary updateManyAndReturn
   */
  export type CommentaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * The data used to update Commentaries.
     */
    data: XOR<CommentaryUpdateManyMutationInput, CommentaryUncheckedUpdateManyInput>
    /**
     * Filter which Commentaries to update
     */
    where?: CommentaryWhereInput
    /**
     * Limit how many Commentaries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commentary upsert
   */
  export type CommentaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * The filter to search for the Commentary to update in case it exists.
     */
    where: CommentaryWhereUniqueInput
    /**
     * In case the Commentary found by the `where` argument doesn't exist, create a new Commentary with this data.
     */
    create: XOR<CommentaryCreateInput, CommentaryUncheckedCreateInput>
    /**
     * In case the Commentary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentaryUpdateInput, CommentaryUncheckedUpdateInput>
  }

  /**
   * Commentary delete
   */
  export type CommentaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter which Commentary to delete.
     */
    where: CommentaryWhereUniqueInput
  }

  /**
   * Commentary deleteMany
   */
  export type CommentaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commentaries to delete
     */
    where?: CommentaryWhereInput
    /**
     * Limit how many Commentaries to delete.
     */
    limit?: number
  }

  /**
   * Commentary without action
   */
  export type CommentaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LibraryNodeScalarFieldEnum: {
    id: 'id',
    parentId: 'parentId',
    path: 'path',
    name: 'name',
    sanskrit: 'sanskrit',
    type: 'type',
    order: 'order',
    verseCount: 'verseCount',
    structure: 'structure',
    meta: 'meta'
  };

  export type LibraryNodeScalarFieldEnum = (typeof LibraryNodeScalarFieldEnum)[keyof typeof LibraryNodeScalarFieldEnum]


  export const VerseScalarFieldEnum: {
    id: 'id',
    chapterNumber: 'chapterNumber',
    verseNumber: 'verseNumber',
    unitType: 'unitType',
    scripts: 'scripts',
    synonyms: 'synonyms',
    segmentation: 'segmentation',
    anvaya: 'anvaya',
    anvayaTranslation: 'anvayaTranslation',
    meter: 'meter',
    theme: 'theme',
    relations: 'relations'
  };

  export type VerseScalarFieldEnum = (typeof VerseScalarFieldEnum)[keyof typeof VerseScalarFieldEnum]


  export const AuthorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    sampradaya: 'sampradaya',
    description: 'description'
  };

  export type AuthorScalarFieldEnum = (typeof AuthorScalarFieldEnum)[keyof typeof AuthorScalarFieldEnum]


  export const TranslationScalarFieldEnum: {
    id: 'id',
    verseId: 'verseId',
    authorId: 'authorId',
    language: 'language',
    description: 'description'
  };

  export type TranslationScalarFieldEnum = (typeof TranslationScalarFieldEnum)[keyof typeof TranslationScalarFieldEnum]


  export const CommentaryScalarFieldEnum: {
    id: 'id',
    verseId: 'verseId',
    authorId: 'authorId',
    language: 'language',
    description: 'description',
    sampradaya: 'sampradaya',
    subCommentaries: 'subCommentaries'
  };

  export type CommentaryScalarFieldEnum = (typeof CommentaryScalarFieldEnum)[keyof typeof CommentaryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type LibraryNodeWhereInput = {
    AND?: LibraryNodeWhereInput | LibraryNodeWhereInput[]
    OR?: LibraryNodeWhereInput[]
    NOT?: LibraryNodeWhereInput | LibraryNodeWhereInput[]
    id?: StringFilter<"LibraryNode"> | string
    parentId?: StringNullableFilter<"LibraryNode"> | string | null
    path?: StringNullableFilter<"LibraryNode"> | string | null
    name?: StringFilter<"LibraryNode"> | string
    sanskrit?: StringNullableFilter<"LibraryNode"> | string | null
    type?: StringFilter<"LibraryNode"> | string
    order?: IntFilter<"LibraryNode"> | number
    verseCount?: IntNullableFilter<"LibraryNode"> | number | null
    structure?: JsonNullableFilter<"LibraryNode">
    meta?: JsonNullableFilter<"LibraryNode">
    parent?: XOR<LibraryNodeNullableScalarRelationFilter, LibraryNodeWhereInput> | null
    children?: LibraryNodeListRelationFilter
  }

  export type LibraryNodeOrderByWithRelationInput = {
    id?: SortOrder
    parentId?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    name?: SortOrder
    sanskrit?: SortOrderInput | SortOrder
    type?: SortOrder
    order?: SortOrder
    verseCount?: SortOrderInput | SortOrder
    structure?: SortOrderInput | SortOrder
    meta?: SortOrderInput | SortOrder
    parent?: LibraryNodeOrderByWithRelationInput
    children?: LibraryNodeOrderByRelationAggregateInput
  }

  export type LibraryNodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LibraryNodeWhereInput | LibraryNodeWhereInput[]
    OR?: LibraryNodeWhereInput[]
    NOT?: LibraryNodeWhereInput | LibraryNodeWhereInput[]
    parentId?: StringNullableFilter<"LibraryNode"> | string | null
    path?: StringNullableFilter<"LibraryNode"> | string | null
    name?: StringFilter<"LibraryNode"> | string
    sanskrit?: StringNullableFilter<"LibraryNode"> | string | null
    type?: StringFilter<"LibraryNode"> | string
    order?: IntFilter<"LibraryNode"> | number
    verseCount?: IntNullableFilter<"LibraryNode"> | number | null
    structure?: JsonNullableFilter<"LibraryNode">
    meta?: JsonNullableFilter<"LibraryNode">
    parent?: XOR<LibraryNodeNullableScalarRelationFilter, LibraryNodeWhereInput> | null
    children?: LibraryNodeListRelationFilter
  }, "id">

  export type LibraryNodeOrderByWithAggregationInput = {
    id?: SortOrder
    parentId?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    name?: SortOrder
    sanskrit?: SortOrderInput | SortOrder
    type?: SortOrder
    order?: SortOrder
    verseCount?: SortOrderInput | SortOrder
    structure?: SortOrderInput | SortOrder
    meta?: SortOrderInput | SortOrder
    _count?: LibraryNodeCountOrderByAggregateInput
    _avg?: LibraryNodeAvgOrderByAggregateInput
    _max?: LibraryNodeMaxOrderByAggregateInput
    _min?: LibraryNodeMinOrderByAggregateInput
    _sum?: LibraryNodeSumOrderByAggregateInput
  }

  export type LibraryNodeScalarWhereWithAggregatesInput = {
    AND?: LibraryNodeScalarWhereWithAggregatesInput | LibraryNodeScalarWhereWithAggregatesInput[]
    OR?: LibraryNodeScalarWhereWithAggregatesInput[]
    NOT?: LibraryNodeScalarWhereWithAggregatesInput | LibraryNodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LibraryNode"> | string
    parentId?: StringNullableWithAggregatesFilter<"LibraryNode"> | string | null
    path?: StringNullableWithAggregatesFilter<"LibraryNode"> | string | null
    name?: StringWithAggregatesFilter<"LibraryNode"> | string
    sanskrit?: StringNullableWithAggregatesFilter<"LibraryNode"> | string | null
    type?: StringWithAggregatesFilter<"LibraryNode"> | string
    order?: IntWithAggregatesFilter<"LibraryNode"> | number
    verseCount?: IntNullableWithAggregatesFilter<"LibraryNode"> | number | null
    structure?: JsonNullableWithAggregatesFilter<"LibraryNode">
    meta?: JsonNullableWithAggregatesFilter<"LibraryNode">
  }

  export type VerseWhereInput = {
    AND?: VerseWhereInput | VerseWhereInput[]
    OR?: VerseWhereInput[]
    NOT?: VerseWhereInput | VerseWhereInput[]
    id?: StringFilter<"Verse"> | string
    chapterNumber?: IntFilter<"Verse"> | number
    verseNumber?: IntFilter<"Verse"> | number
    unitType?: StringNullableFilter<"Verse"> | string | null
    scripts?: JsonNullableFilter<"Verse">
    synonyms?: JsonNullableFilter<"Verse">
    segmentation?: JsonNullableFilter<"Verse">
    anvaya?: JsonNullableFilter<"Verse">
    anvayaTranslation?: JsonNullableFilter<"Verse">
    meter?: StringNullableFilter<"Verse"> | string | null
    theme?: StringNullableFilter<"Verse"> | string | null
    relations?: JsonNullableFilter<"Verse">
    commentaries?: CommentaryListRelationFilter
    translations?: TranslationListRelationFilter
  }

  export type VerseOrderByWithRelationInput = {
    id?: SortOrder
    chapterNumber?: SortOrder
    verseNumber?: SortOrder
    unitType?: SortOrderInput | SortOrder
    scripts?: SortOrderInput | SortOrder
    synonyms?: SortOrderInput | SortOrder
    segmentation?: SortOrderInput | SortOrder
    anvaya?: SortOrderInput | SortOrder
    anvayaTranslation?: SortOrderInput | SortOrder
    meter?: SortOrderInput | SortOrder
    theme?: SortOrderInput | SortOrder
    relations?: SortOrderInput | SortOrder
    commentaries?: CommentaryOrderByRelationAggregateInput
    translations?: TranslationOrderByRelationAggregateInput
  }

  export type VerseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerseWhereInput | VerseWhereInput[]
    OR?: VerseWhereInput[]
    NOT?: VerseWhereInput | VerseWhereInput[]
    chapterNumber?: IntFilter<"Verse"> | number
    verseNumber?: IntFilter<"Verse"> | number
    unitType?: StringNullableFilter<"Verse"> | string | null
    scripts?: JsonNullableFilter<"Verse">
    synonyms?: JsonNullableFilter<"Verse">
    segmentation?: JsonNullableFilter<"Verse">
    anvaya?: JsonNullableFilter<"Verse">
    anvayaTranslation?: JsonNullableFilter<"Verse">
    meter?: StringNullableFilter<"Verse"> | string | null
    theme?: StringNullableFilter<"Verse"> | string | null
    relations?: JsonNullableFilter<"Verse">
    commentaries?: CommentaryListRelationFilter
    translations?: TranslationListRelationFilter
  }, "id">

  export type VerseOrderByWithAggregationInput = {
    id?: SortOrder
    chapterNumber?: SortOrder
    verseNumber?: SortOrder
    unitType?: SortOrderInput | SortOrder
    scripts?: SortOrderInput | SortOrder
    synonyms?: SortOrderInput | SortOrder
    segmentation?: SortOrderInput | SortOrder
    anvaya?: SortOrderInput | SortOrder
    anvayaTranslation?: SortOrderInput | SortOrder
    meter?: SortOrderInput | SortOrder
    theme?: SortOrderInput | SortOrder
    relations?: SortOrderInput | SortOrder
    _count?: VerseCountOrderByAggregateInput
    _avg?: VerseAvgOrderByAggregateInput
    _max?: VerseMaxOrderByAggregateInput
    _min?: VerseMinOrderByAggregateInput
    _sum?: VerseSumOrderByAggregateInput
  }

  export type VerseScalarWhereWithAggregatesInput = {
    AND?: VerseScalarWhereWithAggregatesInput | VerseScalarWhereWithAggregatesInput[]
    OR?: VerseScalarWhereWithAggregatesInput[]
    NOT?: VerseScalarWhereWithAggregatesInput | VerseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verse"> | string
    chapterNumber?: IntWithAggregatesFilter<"Verse"> | number
    verseNumber?: IntWithAggregatesFilter<"Verse"> | number
    unitType?: StringNullableWithAggregatesFilter<"Verse"> | string | null
    scripts?: JsonNullableWithAggregatesFilter<"Verse">
    synonyms?: JsonNullableWithAggregatesFilter<"Verse">
    segmentation?: JsonNullableWithAggregatesFilter<"Verse">
    anvaya?: JsonNullableWithAggregatesFilter<"Verse">
    anvayaTranslation?: JsonNullableWithAggregatesFilter<"Verse">
    meter?: StringNullableWithAggregatesFilter<"Verse"> | string | null
    theme?: StringNullableWithAggregatesFilter<"Verse"> | string | null
    relations?: JsonNullableWithAggregatesFilter<"Verse">
  }

  export type AuthorWhereInput = {
    AND?: AuthorWhereInput | AuthorWhereInput[]
    OR?: AuthorWhereInput[]
    NOT?: AuthorWhereInput | AuthorWhereInput[]
    id?: IntFilter<"Author"> | number
    name?: StringFilter<"Author"> | string
    role?: StringNullableFilter<"Author"> | string | null
    sampradaya?: StringNullableFilter<"Author"> | string | null
    description?: StringNullableFilter<"Author"> | string | null
    translations?: TranslationListRelationFilter
    commentaries?: CommentaryListRelationFilter
  }

  export type AuthorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrderInput | SortOrder
    sampradaya?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    translations?: TranslationOrderByRelationAggregateInput
    commentaries?: CommentaryOrderByRelationAggregateInput
  }

  export type AuthorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: AuthorWhereInput | AuthorWhereInput[]
    OR?: AuthorWhereInput[]
    NOT?: AuthorWhereInput | AuthorWhereInput[]
    role?: StringNullableFilter<"Author"> | string | null
    sampradaya?: StringNullableFilter<"Author"> | string | null
    description?: StringNullableFilter<"Author"> | string | null
    translations?: TranslationListRelationFilter
    commentaries?: CommentaryListRelationFilter
  }, "id" | "name">

  export type AuthorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrderInput | SortOrder
    sampradaya?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    _count?: AuthorCountOrderByAggregateInput
    _avg?: AuthorAvgOrderByAggregateInput
    _max?: AuthorMaxOrderByAggregateInput
    _min?: AuthorMinOrderByAggregateInput
    _sum?: AuthorSumOrderByAggregateInput
  }

  export type AuthorScalarWhereWithAggregatesInput = {
    AND?: AuthorScalarWhereWithAggregatesInput | AuthorScalarWhereWithAggregatesInput[]
    OR?: AuthorScalarWhereWithAggregatesInput[]
    NOT?: AuthorScalarWhereWithAggregatesInput | AuthorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Author"> | number
    name?: StringWithAggregatesFilter<"Author"> | string
    role?: StringNullableWithAggregatesFilter<"Author"> | string | null
    sampradaya?: StringNullableWithAggregatesFilter<"Author"> | string | null
    description?: StringNullableWithAggregatesFilter<"Author"> | string | null
  }

  export type TranslationWhereInput = {
    AND?: TranslationWhereInput | TranslationWhereInput[]
    OR?: TranslationWhereInput[]
    NOT?: TranslationWhereInput | TranslationWhereInput[]
    id?: IntFilter<"Translation"> | number
    verseId?: StringFilter<"Translation"> | string
    authorId?: IntFilter<"Translation"> | number
    language?: StringFilter<"Translation"> | string
    description?: StringFilter<"Translation"> | string
    verse?: XOR<VerseScalarRelationFilter, VerseWhereInput>
    author?: XOR<AuthorScalarRelationFilter, AuthorWhereInput>
  }

  export type TranslationOrderByWithRelationInput = {
    id?: SortOrder
    verseId?: SortOrder
    authorId?: SortOrder
    language?: SortOrder
    description?: SortOrder
    verse?: VerseOrderByWithRelationInput
    author?: AuthorOrderByWithRelationInput
  }

  export type TranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TranslationWhereInput | TranslationWhereInput[]
    OR?: TranslationWhereInput[]
    NOT?: TranslationWhereInput | TranslationWhereInput[]
    verseId?: StringFilter<"Translation"> | string
    authorId?: IntFilter<"Translation"> | number
    language?: StringFilter<"Translation"> | string
    description?: StringFilter<"Translation"> | string
    verse?: XOR<VerseScalarRelationFilter, VerseWhereInput>
    author?: XOR<AuthorScalarRelationFilter, AuthorWhereInput>
  }, "id">

  export type TranslationOrderByWithAggregationInput = {
    id?: SortOrder
    verseId?: SortOrder
    authorId?: SortOrder
    language?: SortOrder
    description?: SortOrder
    _count?: TranslationCountOrderByAggregateInput
    _avg?: TranslationAvgOrderByAggregateInput
    _max?: TranslationMaxOrderByAggregateInput
    _min?: TranslationMinOrderByAggregateInput
    _sum?: TranslationSumOrderByAggregateInput
  }

  export type TranslationScalarWhereWithAggregatesInput = {
    AND?: TranslationScalarWhereWithAggregatesInput | TranslationScalarWhereWithAggregatesInput[]
    OR?: TranslationScalarWhereWithAggregatesInput[]
    NOT?: TranslationScalarWhereWithAggregatesInput | TranslationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Translation"> | number
    verseId?: StringWithAggregatesFilter<"Translation"> | string
    authorId?: IntWithAggregatesFilter<"Translation"> | number
    language?: StringWithAggregatesFilter<"Translation"> | string
    description?: StringWithAggregatesFilter<"Translation"> | string
  }

  export type CommentaryWhereInput = {
    AND?: CommentaryWhereInput | CommentaryWhereInput[]
    OR?: CommentaryWhereInput[]
    NOT?: CommentaryWhereInput | CommentaryWhereInput[]
    id?: IntFilter<"Commentary"> | number
    verseId?: StringFilter<"Commentary"> | string
    authorId?: IntFilter<"Commentary"> | number
    language?: StringFilter<"Commentary"> | string
    description?: StringFilter<"Commentary"> | string
    sampradaya?: StringNullableFilter<"Commentary"> | string | null
    subCommentaries?: JsonNullableFilter<"Commentary">
    verse?: XOR<VerseScalarRelationFilter, VerseWhereInput>
    author?: XOR<AuthorScalarRelationFilter, AuthorWhereInput>
  }

  export type CommentaryOrderByWithRelationInput = {
    id?: SortOrder
    verseId?: SortOrder
    authorId?: SortOrder
    language?: SortOrder
    description?: SortOrder
    sampradaya?: SortOrderInput | SortOrder
    subCommentaries?: SortOrderInput | SortOrder
    verse?: VerseOrderByWithRelationInput
    author?: AuthorOrderByWithRelationInput
  }

  export type CommentaryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommentaryWhereInput | CommentaryWhereInput[]
    OR?: CommentaryWhereInput[]
    NOT?: CommentaryWhereInput | CommentaryWhereInput[]
    verseId?: StringFilter<"Commentary"> | string
    authorId?: IntFilter<"Commentary"> | number
    language?: StringFilter<"Commentary"> | string
    description?: StringFilter<"Commentary"> | string
    sampradaya?: StringNullableFilter<"Commentary"> | string | null
    subCommentaries?: JsonNullableFilter<"Commentary">
    verse?: XOR<VerseScalarRelationFilter, VerseWhereInput>
    author?: XOR<AuthorScalarRelationFilter, AuthorWhereInput>
  }, "id">

  export type CommentaryOrderByWithAggregationInput = {
    id?: SortOrder
    verseId?: SortOrder
    authorId?: SortOrder
    language?: SortOrder
    description?: SortOrder
    sampradaya?: SortOrderInput | SortOrder
    subCommentaries?: SortOrderInput | SortOrder
    _count?: CommentaryCountOrderByAggregateInput
    _avg?: CommentaryAvgOrderByAggregateInput
    _max?: CommentaryMaxOrderByAggregateInput
    _min?: CommentaryMinOrderByAggregateInput
    _sum?: CommentarySumOrderByAggregateInput
  }

  export type CommentaryScalarWhereWithAggregatesInput = {
    AND?: CommentaryScalarWhereWithAggregatesInput | CommentaryScalarWhereWithAggregatesInput[]
    OR?: CommentaryScalarWhereWithAggregatesInput[]
    NOT?: CommentaryScalarWhereWithAggregatesInput | CommentaryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Commentary"> | number
    verseId?: StringWithAggregatesFilter<"Commentary"> | string
    authorId?: IntWithAggregatesFilter<"Commentary"> | number
    language?: StringWithAggregatesFilter<"Commentary"> | string
    description?: StringWithAggregatesFilter<"Commentary"> | string
    sampradaya?: StringNullableWithAggregatesFilter<"Commentary"> | string | null
    subCommentaries?: JsonNullableWithAggregatesFilter<"Commentary">
  }

  export type LibraryNodeCreateInput = {
    id: string
    path?: string | null
    name: string
    sanskrit?: string | null
    type: string
    order?: number
    verseCount?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
    parent?: LibraryNodeCreateNestedOneWithoutChildrenInput
    children?: LibraryNodeCreateNestedManyWithoutParentInput
  }

  export type LibraryNodeUncheckedCreateInput = {
    id: string
    parentId?: string | null
    path?: string | null
    name: string
    sanskrit?: string | null
    type: string
    order?: number
    verseCount?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
    children?: LibraryNodeUncheckedCreateNestedManyWithoutParentInput
  }

  export type LibraryNodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    sanskrit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    verseCount?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
    parent?: LibraryNodeUpdateOneWithoutChildrenNestedInput
    children?: LibraryNodeUpdateManyWithoutParentNestedInput
  }

  export type LibraryNodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    sanskrit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    verseCount?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
    children?: LibraryNodeUncheckedUpdateManyWithoutParentNestedInput
  }

  export type LibraryNodeCreateManyInput = {
    id: string
    parentId?: string | null
    path?: string | null
    name: string
    sanskrit?: string | null
    type: string
    order?: number
    verseCount?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LibraryNodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    sanskrit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    verseCount?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LibraryNodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    sanskrit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    verseCount?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type VerseCreateInput = {
    id: string
    chapterNumber: number
    verseNumber: number
    unitType?: string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: string | null
    theme?: string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    commentaries?: CommentaryCreateNestedManyWithoutVerseInput
    translations?: TranslationCreateNestedManyWithoutVerseInput
  }

  export type VerseUncheckedCreateInput = {
    id: string
    chapterNumber: number
    verseNumber: number
    unitType?: string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: string | null
    theme?: string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    commentaries?: CommentaryUncheckedCreateNestedManyWithoutVerseInput
    translations?: TranslationUncheckedCreateNestedManyWithoutVerseInput
  }

  export type VerseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chapterNumber?: IntFieldUpdateOperationsInput | number
    verseNumber?: IntFieldUpdateOperationsInput | number
    unitType?: NullableStringFieldUpdateOperationsInput | string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    commentaries?: CommentaryUpdateManyWithoutVerseNestedInput
    translations?: TranslationUpdateManyWithoutVerseNestedInput
  }

  export type VerseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chapterNumber?: IntFieldUpdateOperationsInput | number
    verseNumber?: IntFieldUpdateOperationsInput | number
    unitType?: NullableStringFieldUpdateOperationsInput | string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    commentaries?: CommentaryUncheckedUpdateManyWithoutVerseNestedInput
    translations?: TranslationUncheckedUpdateManyWithoutVerseNestedInput
  }

  export type VerseCreateManyInput = {
    id: string
    chapterNumber: number
    verseNumber: number
    unitType?: string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: string | null
    theme?: string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type VerseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chapterNumber?: IntFieldUpdateOperationsInput | number
    verseNumber?: IntFieldUpdateOperationsInput | number
    unitType?: NullableStringFieldUpdateOperationsInput | string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type VerseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chapterNumber?: IntFieldUpdateOperationsInput | number
    verseNumber?: IntFieldUpdateOperationsInput | number
    unitType?: NullableStringFieldUpdateOperationsInput | string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuthorCreateInput = {
    name: string
    role?: string | null
    sampradaya?: string | null
    description?: string | null
    translations?: TranslationCreateNestedManyWithoutAuthorInput
    commentaries?: CommentaryCreateNestedManyWithoutAuthorInput
  }

  export type AuthorUncheckedCreateInput = {
    id?: number
    name: string
    role?: string | null
    sampradaya?: string | null
    description?: string | null
    translations?: TranslationUncheckedCreateNestedManyWithoutAuthorInput
    commentaries?: CommentaryUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type AuthorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    translations?: TranslationUpdateManyWithoutAuthorNestedInput
    commentaries?: CommentaryUpdateManyWithoutAuthorNestedInput
  }

  export type AuthorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    translations?: TranslationUncheckedUpdateManyWithoutAuthorNestedInput
    commentaries?: CommentaryUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type AuthorCreateManyInput = {
    id?: number
    name: string
    role?: string | null
    sampradaya?: string | null
    description?: string | null
  }

  export type AuthorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TranslationCreateInput = {
    language: string
    description: string
    verse: VerseCreateNestedOneWithoutTranslationsInput
    author: AuthorCreateNestedOneWithoutTranslationsInput
  }

  export type TranslationUncheckedCreateInput = {
    id?: number
    verseId: string
    authorId: number
    language: string
    description: string
  }

  export type TranslationUpdateInput = {
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    verse?: VerseUpdateOneRequiredWithoutTranslationsNestedInput
    author?: AuthorUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type TranslationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    verseId?: StringFieldUpdateOperationsInput | string
    authorId?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TranslationCreateManyInput = {
    id?: number
    verseId: string
    authorId: number
    language: string
    description: string
  }

  export type TranslationUpdateManyMutationInput = {
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TranslationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    verseId?: StringFieldUpdateOperationsInput | string
    authorId?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type CommentaryCreateInput = {
    language: string
    description: string
    sampradaya?: string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
    verse: VerseCreateNestedOneWithoutCommentariesInput
    author: AuthorCreateNestedOneWithoutCommentariesInput
  }

  export type CommentaryUncheckedCreateInput = {
    id?: number
    verseId: string
    authorId: number
    language: string
    description: string
    sampradaya?: string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CommentaryUpdateInput = {
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
    verse?: VerseUpdateOneRequiredWithoutCommentariesNestedInput
    author?: AuthorUpdateOneRequiredWithoutCommentariesNestedInput
  }

  export type CommentaryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    verseId?: StringFieldUpdateOperationsInput | string
    authorId?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CommentaryCreateManyInput = {
    id?: number
    verseId: string
    authorId: number
    language: string
    description: string
    sampradaya?: string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CommentaryUpdateManyMutationInput = {
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CommentaryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    verseId?: StringFieldUpdateOperationsInput | string
    authorId?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LibraryNodeNullableScalarRelationFilter = {
    is?: LibraryNodeWhereInput | null
    isNot?: LibraryNodeWhereInput | null
  }

  export type LibraryNodeListRelationFilter = {
    every?: LibraryNodeWhereInput
    some?: LibraryNodeWhereInput
    none?: LibraryNodeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LibraryNodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LibraryNodeCountOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    path?: SortOrder
    name?: SortOrder
    sanskrit?: SortOrder
    type?: SortOrder
    order?: SortOrder
    verseCount?: SortOrder
    structure?: SortOrder
    meta?: SortOrder
  }

  export type LibraryNodeAvgOrderByAggregateInput = {
    order?: SortOrder
    verseCount?: SortOrder
  }

  export type LibraryNodeMaxOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    path?: SortOrder
    name?: SortOrder
    sanskrit?: SortOrder
    type?: SortOrder
    order?: SortOrder
    verseCount?: SortOrder
  }

  export type LibraryNodeMinOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    path?: SortOrder
    name?: SortOrder
    sanskrit?: SortOrder
    type?: SortOrder
    order?: SortOrder
    verseCount?: SortOrder
  }

  export type LibraryNodeSumOrderByAggregateInput = {
    order?: SortOrder
    verseCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type CommentaryListRelationFilter = {
    every?: CommentaryWhereInput
    some?: CommentaryWhereInput
    none?: CommentaryWhereInput
  }

  export type TranslationListRelationFilter = {
    every?: TranslationWhereInput
    some?: TranslationWhereInput
    none?: TranslationWhereInput
  }

  export type CommentaryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VerseCountOrderByAggregateInput = {
    id?: SortOrder
    chapterNumber?: SortOrder
    verseNumber?: SortOrder
    unitType?: SortOrder
    scripts?: SortOrder
    synonyms?: SortOrder
    segmentation?: SortOrder
    anvaya?: SortOrder
    anvayaTranslation?: SortOrder
    meter?: SortOrder
    theme?: SortOrder
    relations?: SortOrder
  }

  export type VerseAvgOrderByAggregateInput = {
    chapterNumber?: SortOrder
    verseNumber?: SortOrder
  }

  export type VerseMaxOrderByAggregateInput = {
    id?: SortOrder
    chapterNumber?: SortOrder
    verseNumber?: SortOrder
    unitType?: SortOrder
    meter?: SortOrder
    theme?: SortOrder
  }

  export type VerseMinOrderByAggregateInput = {
    id?: SortOrder
    chapterNumber?: SortOrder
    verseNumber?: SortOrder
    unitType?: SortOrder
    meter?: SortOrder
    theme?: SortOrder
  }

  export type VerseSumOrderByAggregateInput = {
    chapterNumber?: SortOrder
    verseNumber?: SortOrder
  }

  export type AuthorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    sampradaya?: SortOrder
    description?: SortOrder
  }

  export type AuthorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuthorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    sampradaya?: SortOrder
    description?: SortOrder
  }

  export type AuthorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    sampradaya?: SortOrder
    description?: SortOrder
  }

  export type AuthorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VerseScalarRelationFilter = {
    is?: VerseWhereInput
    isNot?: VerseWhereInput
  }

  export type AuthorScalarRelationFilter = {
    is?: AuthorWhereInput
    isNot?: AuthorWhereInput
  }

  export type TranslationCountOrderByAggregateInput = {
    id?: SortOrder
    verseId?: SortOrder
    authorId?: SortOrder
    language?: SortOrder
    description?: SortOrder
  }

  export type TranslationAvgOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type TranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    verseId?: SortOrder
    authorId?: SortOrder
    language?: SortOrder
    description?: SortOrder
  }

  export type TranslationMinOrderByAggregateInput = {
    id?: SortOrder
    verseId?: SortOrder
    authorId?: SortOrder
    language?: SortOrder
    description?: SortOrder
  }

  export type TranslationSumOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type CommentaryCountOrderByAggregateInput = {
    id?: SortOrder
    verseId?: SortOrder
    authorId?: SortOrder
    language?: SortOrder
    description?: SortOrder
    sampradaya?: SortOrder
    subCommentaries?: SortOrder
  }

  export type CommentaryAvgOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type CommentaryMaxOrderByAggregateInput = {
    id?: SortOrder
    verseId?: SortOrder
    authorId?: SortOrder
    language?: SortOrder
    description?: SortOrder
    sampradaya?: SortOrder
  }

  export type CommentaryMinOrderByAggregateInput = {
    id?: SortOrder
    verseId?: SortOrder
    authorId?: SortOrder
    language?: SortOrder
    description?: SortOrder
    sampradaya?: SortOrder
  }

  export type CommentarySumOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type LibraryNodeCreateNestedOneWithoutChildrenInput = {
    create?: XOR<LibraryNodeCreateWithoutChildrenInput, LibraryNodeUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: LibraryNodeCreateOrConnectWithoutChildrenInput
    connect?: LibraryNodeWhereUniqueInput
  }

  export type LibraryNodeCreateNestedManyWithoutParentInput = {
    create?: XOR<LibraryNodeCreateWithoutParentInput, LibraryNodeUncheckedCreateWithoutParentInput> | LibraryNodeCreateWithoutParentInput[] | LibraryNodeUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LibraryNodeCreateOrConnectWithoutParentInput | LibraryNodeCreateOrConnectWithoutParentInput[]
    createMany?: LibraryNodeCreateManyParentInputEnvelope
    connect?: LibraryNodeWhereUniqueInput | LibraryNodeWhereUniqueInput[]
  }

  export type LibraryNodeUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<LibraryNodeCreateWithoutParentInput, LibraryNodeUncheckedCreateWithoutParentInput> | LibraryNodeCreateWithoutParentInput[] | LibraryNodeUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LibraryNodeCreateOrConnectWithoutParentInput | LibraryNodeCreateOrConnectWithoutParentInput[]
    createMany?: LibraryNodeCreateManyParentInputEnvelope
    connect?: LibraryNodeWhereUniqueInput | LibraryNodeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LibraryNodeUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<LibraryNodeCreateWithoutChildrenInput, LibraryNodeUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: LibraryNodeCreateOrConnectWithoutChildrenInput
    upsert?: LibraryNodeUpsertWithoutChildrenInput
    disconnect?: LibraryNodeWhereInput | boolean
    delete?: LibraryNodeWhereInput | boolean
    connect?: LibraryNodeWhereUniqueInput
    update?: XOR<XOR<LibraryNodeUpdateToOneWithWhereWithoutChildrenInput, LibraryNodeUpdateWithoutChildrenInput>, LibraryNodeUncheckedUpdateWithoutChildrenInput>
  }

  export type LibraryNodeUpdateManyWithoutParentNestedInput = {
    create?: XOR<LibraryNodeCreateWithoutParentInput, LibraryNodeUncheckedCreateWithoutParentInput> | LibraryNodeCreateWithoutParentInput[] | LibraryNodeUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LibraryNodeCreateOrConnectWithoutParentInput | LibraryNodeCreateOrConnectWithoutParentInput[]
    upsert?: LibraryNodeUpsertWithWhereUniqueWithoutParentInput | LibraryNodeUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: LibraryNodeCreateManyParentInputEnvelope
    set?: LibraryNodeWhereUniqueInput | LibraryNodeWhereUniqueInput[]
    disconnect?: LibraryNodeWhereUniqueInput | LibraryNodeWhereUniqueInput[]
    delete?: LibraryNodeWhereUniqueInput | LibraryNodeWhereUniqueInput[]
    connect?: LibraryNodeWhereUniqueInput | LibraryNodeWhereUniqueInput[]
    update?: LibraryNodeUpdateWithWhereUniqueWithoutParentInput | LibraryNodeUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: LibraryNodeUpdateManyWithWhereWithoutParentInput | LibraryNodeUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: LibraryNodeScalarWhereInput | LibraryNodeScalarWhereInput[]
  }

  export type LibraryNodeUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<LibraryNodeCreateWithoutParentInput, LibraryNodeUncheckedCreateWithoutParentInput> | LibraryNodeCreateWithoutParentInput[] | LibraryNodeUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LibraryNodeCreateOrConnectWithoutParentInput | LibraryNodeCreateOrConnectWithoutParentInput[]
    upsert?: LibraryNodeUpsertWithWhereUniqueWithoutParentInput | LibraryNodeUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: LibraryNodeCreateManyParentInputEnvelope
    set?: LibraryNodeWhereUniqueInput | LibraryNodeWhereUniqueInput[]
    disconnect?: LibraryNodeWhereUniqueInput | LibraryNodeWhereUniqueInput[]
    delete?: LibraryNodeWhereUniqueInput | LibraryNodeWhereUniqueInput[]
    connect?: LibraryNodeWhereUniqueInput | LibraryNodeWhereUniqueInput[]
    update?: LibraryNodeUpdateWithWhereUniqueWithoutParentInput | LibraryNodeUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: LibraryNodeUpdateManyWithWhereWithoutParentInput | LibraryNodeUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: LibraryNodeScalarWhereInput | LibraryNodeScalarWhereInput[]
  }

  export type CommentaryCreateNestedManyWithoutVerseInput = {
    create?: XOR<CommentaryCreateWithoutVerseInput, CommentaryUncheckedCreateWithoutVerseInput> | CommentaryCreateWithoutVerseInput[] | CommentaryUncheckedCreateWithoutVerseInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutVerseInput | CommentaryCreateOrConnectWithoutVerseInput[]
    createMany?: CommentaryCreateManyVerseInputEnvelope
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
  }

  export type TranslationCreateNestedManyWithoutVerseInput = {
    create?: XOR<TranslationCreateWithoutVerseInput, TranslationUncheckedCreateWithoutVerseInput> | TranslationCreateWithoutVerseInput[] | TranslationUncheckedCreateWithoutVerseInput[]
    connectOrCreate?: TranslationCreateOrConnectWithoutVerseInput | TranslationCreateOrConnectWithoutVerseInput[]
    createMany?: TranslationCreateManyVerseInputEnvelope
    connect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
  }

  export type CommentaryUncheckedCreateNestedManyWithoutVerseInput = {
    create?: XOR<CommentaryCreateWithoutVerseInput, CommentaryUncheckedCreateWithoutVerseInput> | CommentaryCreateWithoutVerseInput[] | CommentaryUncheckedCreateWithoutVerseInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutVerseInput | CommentaryCreateOrConnectWithoutVerseInput[]
    createMany?: CommentaryCreateManyVerseInputEnvelope
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
  }

  export type TranslationUncheckedCreateNestedManyWithoutVerseInput = {
    create?: XOR<TranslationCreateWithoutVerseInput, TranslationUncheckedCreateWithoutVerseInput> | TranslationCreateWithoutVerseInput[] | TranslationUncheckedCreateWithoutVerseInput[]
    connectOrCreate?: TranslationCreateOrConnectWithoutVerseInput | TranslationCreateOrConnectWithoutVerseInput[]
    createMany?: TranslationCreateManyVerseInputEnvelope
    connect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
  }

  export type CommentaryUpdateManyWithoutVerseNestedInput = {
    create?: XOR<CommentaryCreateWithoutVerseInput, CommentaryUncheckedCreateWithoutVerseInput> | CommentaryCreateWithoutVerseInput[] | CommentaryUncheckedCreateWithoutVerseInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutVerseInput | CommentaryCreateOrConnectWithoutVerseInput[]
    upsert?: CommentaryUpsertWithWhereUniqueWithoutVerseInput | CommentaryUpsertWithWhereUniqueWithoutVerseInput[]
    createMany?: CommentaryCreateManyVerseInputEnvelope
    set?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    disconnect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    delete?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    update?: CommentaryUpdateWithWhereUniqueWithoutVerseInput | CommentaryUpdateWithWhereUniqueWithoutVerseInput[]
    updateMany?: CommentaryUpdateManyWithWhereWithoutVerseInput | CommentaryUpdateManyWithWhereWithoutVerseInput[]
    deleteMany?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
  }

  export type TranslationUpdateManyWithoutVerseNestedInput = {
    create?: XOR<TranslationCreateWithoutVerseInput, TranslationUncheckedCreateWithoutVerseInput> | TranslationCreateWithoutVerseInput[] | TranslationUncheckedCreateWithoutVerseInput[]
    connectOrCreate?: TranslationCreateOrConnectWithoutVerseInput | TranslationCreateOrConnectWithoutVerseInput[]
    upsert?: TranslationUpsertWithWhereUniqueWithoutVerseInput | TranslationUpsertWithWhereUniqueWithoutVerseInput[]
    createMany?: TranslationCreateManyVerseInputEnvelope
    set?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    disconnect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    delete?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    connect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    update?: TranslationUpdateWithWhereUniqueWithoutVerseInput | TranslationUpdateWithWhereUniqueWithoutVerseInput[]
    updateMany?: TranslationUpdateManyWithWhereWithoutVerseInput | TranslationUpdateManyWithWhereWithoutVerseInput[]
    deleteMany?: TranslationScalarWhereInput | TranslationScalarWhereInput[]
  }

  export type CommentaryUncheckedUpdateManyWithoutVerseNestedInput = {
    create?: XOR<CommentaryCreateWithoutVerseInput, CommentaryUncheckedCreateWithoutVerseInput> | CommentaryCreateWithoutVerseInput[] | CommentaryUncheckedCreateWithoutVerseInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutVerseInput | CommentaryCreateOrConnectWithoutVerseInput[]
    upsert?: CommentaryUpsertWithWhereUniqueWithoutVerseInput | CommentaryUpsertWithWhereUniqueWithoutVerseInput[]
    createMany?: CommentaryCreateManyVerseInputEnvelope
    set?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    disconnect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    delete?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    update?: CommentaryUpdateWithWhereUniqueWithoutVerseInput | CommentaryUpdateWithWhereUniqueWithoutVerseInput[]
    updateMany?: CommentaryUpdateManyWithWhereWithoutVerseInput | CommentaryUpdateManyWithWhereWithoutVerseInput[]
    deleteMany?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
  }

  export type TranslationUncheckedUpdateManyWithoutVerseNestedInput = {
    create?: XOR<TranslationCreateWithoutVerseInput, TranslationUncheckedCreateWithoutVerseInput> | TranslationCreateWithoutVerseInput[] | TranslationUncheckedCreateWithoutVerseInput[]
    connectOrCreate?: TranslationCreateOrConnectWithoutVerseInput | TranslationCreateOrConnectWithoutVerseInput[]
    upsert?: TranslationUpsertWithWhereUniqueWithoutVerseInput | TranslationUpsertWithWhereUniqueWithoutVerseInput[]
    createMany?: TranslationCreateManyVerseInputEnvelope
    set?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    disconnect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    delete?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    connect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    update?: TranslationUpdateWithWhereUniqueWithoutVerseInput | TranslationUpdateWithWhereUniqueWithoutVerseInput[]
    updateMany?: TranslationUpdateManyWithWhereWithoutVerseInput | TranslationUpdateManyWithWhereWithoutVerseInput[]
    deleteMany?: TranslationScalarWhereInput | TranslationScalarWhereInput[]
  }

  export type TranslationCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TranslationCreateWithoutAuthorInput, TranslationUncheckedCreateWithoutAuthorInput> | TranslationCreateWithoutAuthorInput[] | TranslationUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TranslationCreateOrConnectWithoutAuthorInput | TranslationCreateOrConnectWithoutAuthorInput[]
    createMany?: TranslationCreateManyAuthorInputEnvelope
    connect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
  }

  export type CommentaryCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CommentaryCreateWithoutAuthorInput, CommentaryUncheckedCreateWithoutAuthorInput> | CommentaryCreateWithoutAuthorInput[] | CommentaryUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutAuthorInput | CommentaryCreateOrConnectWithoutAuthorInput[]
    createMany?: CommentaryCreateManyAuthorInputEnvelope
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
  }

  export type TranslationUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TranslationCreateWithoutAuthorInput, TranslationUncheckedCreateWithoutAuthorInput> | TranslationCreateWithoutAuthorInput[] | TranslationUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TranslationCreateOrConnectWithoutAuthorInput | TranslationCreateOrConnectWithoutAuthorInput[]
    createMany?: TranslationCreateManyAuthorInputEnvelope
    connect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
  }

  export type CommentaryUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CommentaryCreateWithoutAuthorInput, CommentaryUncheckedCreateWithoutAuthorInput> | CommentaryCreateWithoutAuthorInput[] | CommentaryUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutAuthorInput | CommentaryCreateOrConnectWithoutAuthorInput[]
    createMany?: CommentaryCreateManyAuthorInputEnvelope
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
  }

  export type TranslationUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TranslationCreateWithoutAuthorInput, TranslationUncheckedCreateWithoutAuthorInput> | TranslationCreateWithoutAuthorInput[] | TranslationUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TranslationCreateOrConnectWithoutAuthorInput | TranslationCreateOrConnectWithoutAuthorInput[]
    upsert?: TranslationUpsertWithWhereUniqueWithoutAuthorInput | TranslationUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TranslationCreateManyAuthorInputEnvelope
    set?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    disconnect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    delete?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    connect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    update?: TranslationUpdateWithWhereUniqueWithoutAuthorInput | TranslationUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TranslationUpdateManyWithWhereWithoutAuthorInput | TranslationUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TranslationScalarWhereInput | TranslationScalarWhereInput[]
  }

  export type CommentaryUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CommentaryCreateWithoutAuthorInput, CommentaryUncheckedCreateWithoutAuthorInput> | CommentaryCreateWithoutAuthorInput[] | CommentaryUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutAuthorInput | CommentaryCreateOrConnectWithoutAuthorInput[]
    upsert?: CommentaryUpsertWithWhereUniqueWithoutAuthorInput | CommentaryUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CommentaryCreateManyAuthorInputEnvelope
    set?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    disconnect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    delete?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    update?: CommentaryUpdateWithWhereUniqueWithoutAuthorInput | CommentaryUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CommentaryUpdateManyWithWhereWithoutAuthorInput | CommentaryUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
  }

  export type TranslationUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TranslationCreateWithoutAuthorInput, TranslationUncheckedCreateWithoutAuthorInput> | TranslationCreateWithoutAuthorInput[] | TranslationUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TranslationCreateOrConnectWithoutAuthorInput | TranslationCreateOrConnectWithoutAuthorInput[]
    upsert?: TranslationUpsertWithWhereUniqueWithoutAuthorInput | TranslationUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TranslationCreateManyAuthorInputEnvelope
    set?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    disconnect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    delete?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    connect?: TranslationWhereUniqueInput | TranslationWhereUniqueInput[]
    update?: TranslationUpdateWithWhereUniqueWithoutAuthorInput | TranslationUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TranslationUpdateManyWithWhereWithoutAuthorInput | TranslationUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TranslationScalarWhereInput | TranslationScalarWhereInput[]
  }

  export type CommentaryUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CommentaryCreateWithoutAuthorInput, CommentaryUncheckedCreateWithoutAuthorInput> | CommentaryCreateWithoutAuthorInput[] | CommentaryUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutAuthorInput | CommentaryCreateOrConnectWithoutAuthorInput[]
    upsert?: CommentaryUpsertWithWhereUniqueWithoutAuthorInput | CommentaryUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CommentaryCreateManyAuthorInputEnvelope
    set?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    disconnect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    delete?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    update?: CommentaryUpdateWithWhereUniqueWithoutAuthorInput | CommentaryUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CommentaryUpdateManyWithWhereWithoutAuthorInput | CommentaryUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
  }

  export type VerseCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<VerseCreateWithoutTranslationsInput, VerseUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: VerseCreateOrConnectWithoutTranslationsInput
    connect?: VerseWhereUniqueInput
  }

  export type AuthorCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<AuthorCreateWithoutTranslationsInput, AuthorUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: AuthorCreateOrConnectWithoutTranslationsInput
    connect?: AuthorWhereUniqueInput
  }

  export type VerseUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<VerseCreateWithoutTranslationsInput, VerseUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: VerseCreateOrConnectWithoutTranslationsInput
    upsert?: VerseUpsertWithoutTranslationsInput
    connect?: VerseWhereUniqueInput
    update?: XOR<XOR<VerseUpdateToOneWithWhereWithoutTranslationsInput, VerseUpdateWithoutTranslationsInput>, VerseUncheckedUpdateWithoutTranslationsInput>
  }

  export type AuthorUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<AuthorCreateWithoutTranslationsInput, AuthorUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: AuthorCreateOrConnectWithoutTranslationsInput
    upsert?: AuthorUpsertWithoutTranslationsInput
    connect?: AuthorWhereUniqueInput
    update?: XOR<XOR<AuthorUpdateToOneWithWhereWithoutTranslationsInput, AuthorUpdateWithoutTranslationsInput>, AuthorUncheckedUpdateWithoutTranslationsInput>
  }

  export type VerseCreateNestedOneWithoutCommentariesInput = {
    create?: XOR<VerseCreateWithoutCommentariesInput, VerseUncheckedCreateWithoutCommentariesInput>
    connectOrCreate?: VerseCreateOrConnectWithoutCommentariesInput
    connect?: VerseWhereUniqueInput
  }

  export type AuthorCreateNestedOneWithoutCommentariesInput = {
    create?: XOR<AuthorCreateWithoutCommentariesInput, AuthorUncheckedCreateWithoutCommentariesInput>
    connectOrCreate?: AuthorCreateOrConnectWithoutCommentariesInput
    connect?: AuthorWhereUniqueInput
  }

  export type VerseUpdateOneRequiredWithoutCommentariesNestedInput = {
    create?: XOR<VerseCreateWithoutCommentariesInput, VerseUncheckedCreateWithoutCommentariesInput>
    connectOrCreate?: VerseCreateOrConnectWithoutCommentariesInput
    upsert?: VerseUpsertWithoutCommentariesInput
    connect?: VerseWhereUniqueInput
    update?: XOR<XOR<VerseUpdateToOneWithWhereWithoutCommentariesInput, VerseUpdateWithoutCommentariesInput>, VerseUncheckedUpdateWithoutCommentariesInput>
  }

  export type AuthorUpdateOneRequiredWithoutCommentariesNestedInput = {
    create?: XOR<AuthorCreateWithoutCommentariesInput, AuthorUncheckedCreateWithoutCommentariesInput>
    connectOrCreate?: AuthorCreateOrConnectWithoutCommentariesInput
    upsert?: AuthorUpsertWithoutCommentariesInput
    connect?: AuthorWhereUniqueInput
    update?: XOR<XOR<AuthorUpdateToOneWithWhereWithoutCommentariesInput, AuthorUpdateWithoutCommentariesInput>, AuthorUncheckedUpdateWithoutCommentariesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LibraryNodeCreateWithoutChildrenInput = {
    id: string
    path?: string | null
    name: string
    sanskrit?: string | null
    type: string
    order?: number
    verseCount?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
    parent?: LibraryNodeCreateNestedOneWithoutChildrenInput
  }

  export type LibraryNodeUncheckedCreateWithoutChildrenInput = {
    id: string
    parentId?: string | null
    path?: string | null
    name: string
    sanskrit?: string | null
    type: string
    order?: number
    verseCount?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LibraryNodeCreateOrConnectWithoutChildrenInput = {
    where: LibraryNodeWhereUniqueInput
    create: XOR<LibraryNodeCreateWithoutChildrenInput, LibraryNodeUncheckedCreateWithoutChildrenInput>
  }

  export type LibraryNodeCreateWithoutParentInput = {
    id: string
    path?: string | null
    name: string
    sanskrit?: string | null
    type: string
    order?: number
    verseCount?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
    children?: LibraryNodeCreateNestedManyWithoutParentInput
  }

  export type LibraryNodeUncheckedCreateWithoutParentInput = {
    id: string
    path?: string | null
    name: string
    sanskrit?: string | null
    type: string
    order?: number
    verseCount?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
    children?: LibraryNodeUncheckedCreateNestedManyWithoutParentInput
  }

  export type LibraryNodeCreateOrConnectWithoutParentInput = {
    where: LibraryNodeWhereUniqueInput
    create: XOR<LibraryNodeCreateWithoutParentInput, LibraryNodeUncheckedCreateWithoutParentInput>
  }

  export type LibraryNodeCreateManyParentInputEnvelope = {
    data: LibraryNodeCreateManyParentInput | LibraryNodeCreateManyParentInput[]
  }

  export type LibraryNodeUpsertWithoutChildrenInput = {
    update: XOR<LibraryNodeUpdateWithoutChildrenInput, LibraryNodeUncheckedUpdateWithoutChildrenInput>
    create: XOR<LibraryNodeCreateWithoutChildrenInput, LibraryNodeUncheckedCreateWithoutChildrenInput>
    where?: LibraryNodeWhereInput
  }

  export type LibraryNodeUpdateToOneWithWhereWithoutChildrenInput = {
    where?: LibraryNodeWhereInput
    data: XOR<LibraryNodeUpdateWithoutChildrenInput, LibraryNodeUncheckedUpdateWithoutChildrenInput>
  }

  export type LibraryNodeUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    sanskrit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    verseCount?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
    parent?: LibraryNodeUpdateOneWithoutChildrenNestedInput
  }

  export type LibraryNodeUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    sanskrit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    verseCount?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LibraryNodeUpsertWithWhereUniqueWithoutParentInput = {
    where: LibraryNodeWhereUniqueInput
    update: XOR<LibraryNodeUpdateWithoutParentInput, LibraryNodeUncheckedUpdateWithoutParentInput>
    create: XOR<LibraryNodeCreateWithoutParentInput, LibraryNodeUncheckedCreateWithoutParentInput>
  }

  export type LibraryNodeUpdateWithWhereUniqueWithoutParentInput = {
    where: LibraryNodeWhereUniqueInput
    data: XOR<LibraryNodeUpdateWithoutParentInput, LibraryNodeUncheckedUpdateWithoutParentInput>
  }

  export type LibraryNodeUpdateManyWithWhereWithoutParentInput = {
    where: LibraryNodeScalarWhereInput
    data: XOR<LibraryNodeUpdateManyMutationInput, LibraryNodeUncheckedUpdateManyWithoutParentInput>
  }

  export type LibraryNodeScalarWhereInput = {
    AND?: LibraryNodeScalarWhereInput | LibraryNodeScalarWhereInput[]
    OR?: LibraryNodeScalarWhereInput[]
    NOT?: LibraryNodeScalarWhereInput | LibraryNodeScalarWhereInput[]
    id?: StringFilter<"LibraryNode"> | string
    parentId?: StringNullableFilter<"LibraryNode"> | string | null
    path?: StringNullableFilter<"LibraryNode"> | string | null
    name?: StringFilter<"LibraryNode"> | string
    sanskrit?: StringNullableFilter<"LibraryNode"> | string | null
    type?: StringFilter<"LibraryNode"> | string
    order?: IntFilter<"LibraryNode"> | number
    verseCount?: IntNullableFilter<"LibraryNode"> | number | null
    structure?: JsonNullableFilter<"LibraryNode">
    meta?: JsonNullableFilter<"LibraryNode">
  }

  export type CommentaryCreateWithoutVerseInput = {
    language: string
    description: string
    sampradaya?: string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
    author: AuthorCreateNestedOneWithoutCommentariesInput
  }

  export type CommentaryUncheckedCreateWithoutVerseInput = {
    id?: number
    authorId: number
    language: string
    description: string
    sampradaya?: string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CommentaryCreateOrConnectWithoutVerseInput = {
    where: CommentaryWhereUniqueInput
    create: XOR<CommentaryCreateWithoutVerseInput, CommentaryUncheckedCreateWithoutVerseInput>
  }

  export type CommentaryCreateManyVerseInputEnvelope = {
    data: CommentaryCreateManyVerseInput | CommentaryCreateManyVerseInput[]
  }

  export type TranslationCreateWithoutVerseInput = {
    language: string
    description: string
    author: AuthorCreateNestedOneWithoutTranslationsInput
  }

  export type TranslationUncheckedCreateWithoutVerseInput = {
    id?: number
    authorId: number
    language: string
    description: string
  }

  export type TranslationCreateOrConnectWithoutVerseInput = {
    where: TranslationWhereUniqueInput
    create: XOR<TranslationCreateWithoutVerseInput, TranslationUncheckedCreateWithoutVerseInput>
  }

  export type TranslationCreateManyVerseInputEnvelope = {
    data: TranslationCreateManyVerseInput | TranslationCreateManyVerseInput[]
  }

  export type CommentaryUpsertWithWhereUniqueWithoutVerseInput = {
    where: CommentaryWhereUniqueInput
    update: XOR<CommentaryUpdateWithoutVerseInput, CommentaryUncheckedUpdateWithoutVerseInput>
    create: XOR<CommentaryCreateWithoutVerseInput, CommentaryUncheckedCreateWithoutVerseInput>
  }

  export type CommentaryUpdateWithWhereUniqueWithoutVerseInput = {
    where: CommentaryWhereUniqueInput
    data: XOR<CommentaryUpdateWithoutVerseInput, CommentaryUncheckedUpdateWithoutVerseInput>
  }

  export type CommentaryUpdateManyWithWhereWithoutVerseInput = {
    where: CommentaryScalarWhereInput
    data: XOR<CommentaryUpdateManyMutationInput, CommentaryUncheckedUpdateManyWithoutVerseInput>
  }

  export type CommentaryScalarWhereInput = {
    AND?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
    OR?: CommentaryScalarWhereInput[]
    NOT?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
    id?: IntFilter<"Commentary"> | number
    verseId?: StringFilter<"Commentary"> | string
    authorId?: IntFilter<"Commentary"> | number
    language?: StringFilter<"Commentary"> | string
    description?: StringFilter<"Commentary"> | string
    sampradaya?: StringNullableFilter<"Commentary"> | string | null
    subCommentaries?: JsonNullableFilter<"Commentary">
  }

  export type TranslationUpsertWithWhereUniqueWithoutVerseInput = {
    where: TranslationWhereUniqueInput
    update: XOR<TranslationUpdateWithoutVerseInput, TranslationUncheckedUpdateWithoutVerseInput>
    create: XOR<TranslationCreateWithoutVerseInput, TranslationUncheckedCreateWithoutVerseInput>
  }

  export type TranslationUpdateWithWhereUniqueWithoutVerseInput = {
    where: TranslationWhereUniqueInput
    data: XOR<TranslationUpdateWithoutVerseInput, TranslationUncheckedUpdateWithoutVerseInput>
  }

  export type TranslationUpdateManyWithWhereWithoutVerseInput = {
    where: TranslationScalarWhereInput
    data: XOR<TranslationUpdateManyMutationInput, TranslationUncheckedUpdateManyWithoutVerseInput>
  }

  export type TranslationScalarWhereInput = {
    AND?: TranslationScalarWhereInput | TranslationScalarWhereInput[]
    OR?: TranslationScalarWhereInput[]
    NOT?: TranslationScalarWhereInput | TranslationScalarWhereInput[]
    id?: IntFilter<"Translation"> | number
    verseId?: StringFilter<"Translation"> | string
    authorId?: IntFilter<"Translation"> | number
    language?: StringFilter<"Translation"> | string
    description?: StringFilter<"Translation"> | string
  }

  export type TranslationCreateWithoutAuthorInput = {
    language: string
    description: string
    verse: VerseCreateNestedOneWithoutTranslationsInput
  }

  export type TranslationUncheckedCreateWithoutAuthorInput = {
    id?: number
    verseId: string
    language: string
    description: string
  }

  export type TranslationCreateOrConnectWithoutAuthorInput = {
    where: TranslationWhereUniqueInput
    create: XOR<TranslationCreateWithoutAuthorInput, TranslationUncheckedCreateWithoutAuthorInput>
  }

  export type TranslationCreateManyAuthorInputEnvelope = {
    data: TranslationCreateManyAuthorInput | TranslationCreateManyAuthorInput[]
  }

  export type CommentaryCreateWithoutAuthorInput = {
    language: string
    description: string
    sampradaya?: string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
    verse: VerseCreateNestedOneWithoutCommentariesInput
  }

  export type CommentaryUncheckedCreateWithoutAuthorInput = {
    id?: number
    verseId: string
    language: string
    description: string
    sampradaya?: string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CommentaryCreateOrConnectWithoutAuthorInput = {
    where: CommentaryWhereUniqueInput
    create: XOR<CommentaryCreateWithoutAuthorInput, CommentaryUncheckedCreateWithoutAuthorInput>
  }

  export type CommentaryCreateManyAuthorInputEnvelope = {
    data: CommentaryCreateManyAuthorInput | CommentaryCreateManyAuthorInput[]
  }

  export type TranslationUpsertWithWhereUniqueWithoutAuthorInput = {
    where: TranslationWhereUniqueInput
    update: XOR<TranslationUpdateWithoutAuthorInput, TranslationUncheckedUpdateWithoutAuthorInput>
    create: XOR<TranslationCreateWithoutAuthorInput, TranslationUncheckedCreateWithoutAuthorInput>
  }

  export type TranslationUpdateWithWhereUniqueWithoutAuthorInput = {
    where: TranslationWhereUniqueInput
    data: XOR<TranslationUpdateWithoutAuthorInput, TranslationUncheckedUpdateWithoutAuthorInput>
  }

  export type TranslationUpdateManyWithWhereWithoutAuthorInput = {
    where: TranslationScalarWhereInput
    data: XOR<TranslationUpdateManyMutationInput, TranslationUncheckedUpdateManyWithoutAuthorInput>
  }

  export type CommentaryUpsertWithWhereUniqueWithoutAuthorInput = {
    where: CommentaryWhereUniqueInput
    update: XOR<CommentaryUpdateWithoutAuthorInput, CommentaryUncheckedUpdateWithoutAuthorInput>
    create: XOR<CommentaryCreateWithoutAuthorInput, CommentaryUncheckedCreateWithoutAuthorInput>
  }

  export type CommentaryUpdateWithWhereUniqueWithoutAuthorInput = {
    where: CommentaryWhereUniqueInput
    data: XOR<CommentaryUpdateWithoutAuthorInput, CommentaryUncheckedUpdateWithoutAuthorInput>
  }

  export type CommentaryUpdateManyWithWhereWithoutAuthorInput = {
    where: CommentaryScalarWhereInput
    data: XOR<CommentaryUpdateManyMutationInput, CommentaryUncheckedUpdateManyWithoutAuthorInput>
  }

  export type VerseCreateWithoutTranslationsInput = {
    id: string
    chapterNumber: number
    verseNumber: number
    unitType?: string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: string | null
    theme?: string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    commentaries?: CommentaryCreateNestedManyWithoutVerseInput
  }

  export type VerseUncheckedCreateWithoutTranslationsInput = {
    id: string
    chapterNumber: number
    verseNumber: number
    unitType?: string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: string | null
    theme?: string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    commentaries?: CommentaryUncheckedCreateNestedManyWithoutVerseInput
  }

  export type VerseCreateOrConnectWithoutTranslationsInput = {
    where: VerseWhereUniqueInput
    create: XOR<VerseCreateWithoutTranslationsInput, VerseUncheckedCreateWithoutTranslationsInput>
  }

  export type AuthorCreateWithoutTranslationsInput = {
    name: string
    role?: string | null
    sampradaya?: string | null
    description?: string | null
    commentaries?: CommentaryCreateNestedManyWithoutAuthorInput
  }

  export type AuthorUncheckedCreateWithoutTranslationsInput = {
    id?: number
    name: string
    role?: string | null
    sampradaya?: string | null
    description?: string | null
    commentaries?: CommentaryUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type AuthorCreateOrConnectWithoutTranslationsInput = {
    where: AuthorWhereUniqueInput
    create: XOR<AuthorCreateWithoutTranslationsInput, AuthorUncheckedCreateWithoutTranslationsInput>
  }

  export type VerseUpsertWithoutTranslationsInput = {
    update: XOR<VerseUpdateWithoutTranslationsInput, VerseUncheckedUpdateWithoutTranslationsInput>
    create: XOR<VerseCreateWithoutTranslationsInput, VerseUncheckedCreateWithoutTranslationsInput>
    where?: VerseWhereInput
  }

  export type VerseUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: VerseWhereInput
    data: XOR<VerseUpdateWithoutTranslationsInput, VerseUncheckedUpdateWithoutTranslationsInput>
  }

  export type VerseUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chapterNumber?: IntFieldUpdateOperationsInput | number
    verseNumber?: IntFieldUpdateOperationsInput | number
    unitType?: NullableStringFieldUpdateOperationsInput | string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    commentaries?: CommentaryUpdateManyWithoutVerseNestedInput
  }

  export type VerseUncheckedUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chapterNumber?: IntFieldUpdateOperationsInput | number
    verseNumber?: IntFieldUpdateOperationsInput | number
    unitType?: NullableStringFieldUpdateOperationsInput | string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    commentaries?: CommentaryUncheckedUpdateManyWithoutVerseNestedInput
  }

  export type AuthorUpsertWithoutTranslationsInput = {
    update: XOR<AuthorUpdateWithoutTranslationsInput, AuthorUncheckedUpdateWithoutTranslationsInput>
    create: XOR<AuthorCreateWithoutTranslationsInput, AuthorUncheckedCreateWithoutTranslationsInput>
    where?: AuthorWhereInput
  }

  export type AuthorUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: AuthorWhereInput
    data: XOR<AuthorUpdateWithoutTranslationsInput, AuthorUncheckedUpdateWithoutTranslationsInput>
  }

  export type AuthorUpdateWithoutTranslationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    commentaries?: CommentaryUpdateManyWithoutAuthorNestedInput
  }

  export type AuthorUncheckedUpdateWithoutTranslationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    commentaries?: CommentaryUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type VerseCreateWithoutCommentariesInput = {
    id: string
    chapterNumber: number
    verseNumber: number
    unitType?: string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: string | null
    theme?: string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    translations?: TranslationCreateNestedManyWithoutVerseInput
  }

  export type VerseUncheckedCreateWithoutCommentariesInput = {
    id: string
    chapterNumber: number
    verseNumber: number
    unitType?: string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: string | null
    theme?: string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    translations?: TranslationUncheckedCreateNestedManyWithoutVerseInput
  }

  export type VerseCreateOrConnectWithoutCommentariesInput = {
    where: VerseWhereUniqueInput
    create: XOR<VerseCreateWithoutCommentariesInput, VerseUncheckedCreateWithoutCommentariesInput>
  }

  export type AuthorCreateWithoutCommentariesInput = {
    name: string
    role?: string | null
    sampradaya?: string | null
    description?: string | null
    translations?: TranslationCreateNestedManyWithoutAuthorInput
  }

  export type AuthorUncheckedCreateWithoutCommentariesInput = {
    id?: number
    name: string
    role?: string | null
    sampradaya?: string | null
    description?: string | null
    translations?: TranslationUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type AuthorCreateOrConnectWithoutCommentariesInput = {
    where: AuthorWhereUniqueInput
    create: XOR<AuthorCreateWithoutCommentariesInput, AuthorUncheckedCreateWithoutCommentariesInput>
  }

  export type VerseUpsertWithoutCommentariesInput = {
    update: XOR<VerseUpdateWithoutCommentariesInput, VerseUncheckedUpdateWithoutCommentariesInput>
    create: XOR<VerseCreateWithoutCommentariesInput, VerseUncheckedCreateWithoutCommentariesInput>
    where?: VerseWhereInput
  }

  export type VerseUpdateToOneWithWhereWithoutCommentariesInput = {
    where?: VerseWhereInput
    data: XOR<VerseUpdateWithoutCommentariesInput, VerseUncheckedUpdateWithoutCommentariesInput>
  }

  export type VerseUpdateWithoutCommentariesInput = {
    id?: StringFieldUpdateOperationsInput | string
    chapterNumber?: IntFieldUpdateOperationsInput | number
    verseNumber?: IntFieldUpdateOperationsInput | number
    unitType?: NullableStringFieldUpdateOperationsInput | string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    translations?: TranslationUpdateManyWithoutVerseNestedInput
  }

  export type VerseUncheckedUpdateWithoutCommentariesInput = {
    id?: StringFieldUpdateOperationsInput | string
    chapterNumber?: IntFieldUpdateOperationsInput | number
    verseNumber?: IntFieldUpdateOperationsInput | number
    unitType?: NullableStringFieldUpdateOperationsInput | string | null
    scripts?: NullableJsonNullValueInput | InputJsonValue
    synonyms?: NullableJsonNullValueInput | InputJsonValue
    segmentation?: NullableJsonNullValueInput | InputJsonValue
    anvaya?: NullableJsonNullValueInput | InputJsonValue
    anvayaTranslation?: NullableJsonNullValueInput | InputJsonValue
    meter?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    relations?: NullableJsonNullValueInput | InputJsonValue
    translations?: TranslationUncheckedUpdateManyWithoutVerseNestedInput
  }

  export type AuthorUpsertWithoutCommentariesInput = {
    update: XOR<AuthorUpdateWithoutCommentariesInput, AuthorUncheckedUpdateWithoutCommentariesInput>
    create: XOR<AuthorCreateWithoutCommentariesInput, AuthorUncheckedCreateWithoutCommentariesInput>
    where?: AuthorWhereInput
  }

  export type AuthorUpdateToOneWithWhereWithoutCommentariesInput = {
    where?: AuthorWhereInput
    data: XOR<AuthorUpdateWithoutCommentariesInput, AuthorUncheckedUpdateWithoutCommentariesInput>
  }

  export type AuthorUpdateWithoutCommentariesInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    translations?: TranslationUpdateManyWithoutAuthorNestedInput
  }

  export type AuthorUncheckedUpdateWithoutCommentariesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    translations?: TranslationUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type LibraryNodeCreateManyParentInput = {
    id: string
    path?: string | null
    name: string
    sanskrit?: string | null
    type: string
    order?: number
    verseCount?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LibraryNodeUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    sanskrit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    verseCount?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
    children?: LibraryNodeUpdateManyWithoutParentNestedInput
  }

  export type LibraryNodeUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    sanskrit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    verseCount?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
    children?: LibraryNodeUncheckedUpdateManyWithoutParentNestedInput
  }

  export type LibraryNodeUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    sanskrit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    verseCount?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CommentaryCreateManyVerseInput = {
    id?: number
    authorId: number
    language: string
    description: string
    sampradaya?: string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TranslationCreateManyVerseInput = {
    id?: number
    authorId: number
    language: string
    description: string
  }

  export type CommentaryUpdateWithoutVerseInput = {
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
    author?: AuthorUpdateOneRequiredWithoutCommentariesNestedInput
  }

  export type CommentaryUncheckedUpdateWithoutVerseInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CommentaryUncheckedUpdateManyWithoutVerseInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TranslationUpdateWithoutVerseInput = {
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    author?: AuthorUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type TranslationUncheckedUpdateWithoutVerseInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TranslationUncheckedUpdateManyWithoutVerseInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TranslationCreateManyAuthorInput = {
    id?: number
    verseId: string
    language: string
    description: string
  }

  export type CommentaryCreateManyAuthorInput = {
    id?: number
    verseId: string
    language: string
    description: string
    sampradaya?: string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TranslationUpdateWithoutAuthorInput = {
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    verse?: VerseUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type TranslationUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    verseId?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TranslationUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    verseId?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type CommentaryUpdateWithoutAuthorInput = {
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
    verse?: VerseUpdateOneRequiredWithoutCommentariesNestedInput
  }

  export type CommentaryUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    verseId?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CommentaryUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    verseId?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sampradaya?: NullableStringFieldUpdateOperationsInput | string | null
    subCommentaries?: NullableJsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}