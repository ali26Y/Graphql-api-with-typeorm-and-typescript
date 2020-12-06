import { Resolver, Mutation, Arg, Int, Query, InputType, Field } from 'type-graphql';
import { Movie } from '../entity/Movie';

@InputType()
class MovieInput {
    @Field()
    title: string;

    @Field(() => Int)
    minutes: number;
}

@InputType()
class MovieUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => Int, { nullable: true })
    minutes?: number;
}


@Resolver()
export class MovieResolver {
    @Mutation(() => Movie)
    async createMovie(
        @Arg("options", () => MovieInput) options: MovieInput,
        
        // below is an alternative syntax:
        // @Arg('title', () => String) title: string,
        // @Arg('minutes', () => Int) minutes: number
    ) { 
        const movie = await Movie.create(options).save();

        // below is an alternative:
        // await Movie.insert(options);

        // below is an alternative syntax:
        // await Movie.insert({ title, minutes });
        
        return movie;
    }

    @Mutation(() => Boolean)
    async updateMovie(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
    ) {
        await Movie.update({ id }, input);
        return true;
    }

    @Mutation(() => Boolean)
    async deleteMovie(
        @Arg("id", () => Int) id: number,
    ) {
        await Movie.delete({ id });
        return true;
    }
    

    @Query(() => [Movie])
    movies() {
        return Movie.find();
    }
}
