package petfinder.site.endpoint;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.rating.RatingDto;
import petfinder.site.common.rating.RatingService;

import java.util.Optional;

@RestController
@RequestMapping("/api/rating")
public class RatingEndpoint {
    @Autowired
    private RatingService ratingService;

    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<RatingDto> getRating(@PathVariable("id") String id) {
        return ratingService.findRating(id);
    }

    @PostMapping(value = "")
    public RatingDto saveRating(@RequestBody RatingDto rating) {
        ratingService.save(rating);
        return rating;
    }
}
