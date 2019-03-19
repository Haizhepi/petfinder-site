package petfinder.site.common.user;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.pet.PetDto;
import petfinder.site.elasticsearch.*;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class UserDao {
	@Autowired
	private UserElasticSearchRepository userRepository;

	@Autowired
	private UserPetElasticsearchRepository userPetRepository;

	@Autowired
	private PetElasticsearchRepository petRepository;

	@Autowired
	private BookingElasticsearchRepository bookingRepository;

	public Optional<UserAuthenticationDto> findUserByPrincipal(String principal) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("user.principal=\"%s\"", principal.replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		return userRepository.search(searchSourceBuilder).stream().findFirst();
	}

	public void save(UserAuthenticationDto userAuthentication) {
		System.out.println(userAuthentication.getUser().getGender());
		System.out.println(userAuthentication.getUser().getLastName());
		System.out.println(userAuthentication.getUser().getFirstName());
		System.out.println(userAuthentication.getUser().getRoles().get(0));
		userRepository.save(userAuthentication);
	}

	public List<PetDto> findPets(UserDto user) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("userPrincipal=\"%s\"", user.getPrincipal().replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		List<UserPetDto> userPets = userPetRepository.search(searchSourceBuilder);
		return userPets.stream()
				.map(userPet -> petRepository.find(userPet.getPetId()).get())
				.collect(Collectors.toList());
	}

	public List<BookingDto> findBookings(UserDto user) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("owner=\"%s\"", user.getPrincipal().replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		List<BookingDto> bookinsgs = bookingRepository.search(searchSourceBuilder);
		return bookinsgs;
	}



	public UserPetDto save(UserPetDto userPetDto) {
		return userPetRepository.save(userPetDto);
	}


}