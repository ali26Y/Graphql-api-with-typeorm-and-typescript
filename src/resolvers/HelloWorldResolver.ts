import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  hello() {
    return "hi!";
  }

  @Query(() => Number)
  Number() {
      return 5;
  }
}
