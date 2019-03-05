package petfinder.site.common.user.sitter;

import alloy.elasticsearch.ElasticSearchClientProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.SitterAvailabilityRepository;

import java.util.Optional;

@Repository
public class SitterAvailabilityDao {
    @Autowired
    private SitterAvailabilityRepository sitterAvailabilityRepository;

    @Autowired
    private ElasticSearchClientProvider elasticSearchClientProvider;

    public Optional<SitterAvailabilityDto> findAvailability(String id) {

        Optional<SitterAvailabilityDto> temp = sitterAvailabilityRepository.find(id);
        if (temp.isPresent()) {
            System.out.println(temp.get().getAvailability());
        }
        return temp;
    }

    public void save(SitterAvailabilityDto sitterAvailabilityDto) {
        sitterAvailabilityRepository.save(sitterAvailabilityDto);
    }
}
